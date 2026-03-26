/**
 * Customer Segmentation Admin Scripts
 * 
 * @package SakwoodIntegration
 * @since 1.1.0
 */

(function($) {
    'use strict';

    $(document).ready(function() {
        initSegmentForm();
        initSegmentsList();
        initMembersPage();
    });

    /**
     * Initialize segment form (create/edit)
     */
    function initSegmentForm() {
        const $form = $('#segment-form');
        if (!$form.length) return;

        let groupIndex = 0;
        let ruleIndex = 0;

        // Toggle rules editor based on segment type
        $('#segment_type').on('change', function() {
            if ($(this).val() === 'dynamic') {
                $('#rules-editor-container').slideDown();
            } else {
                $('#rules-editor-container').slideUp();
            }
        });

        // Add rule group
        $('#add-rule-group').on('click', function() {
            addRuleGroup(groupIndex++);
        });

        // Add rule to group (delegated)
        $(document).on('click', '.add-rule', function() {
            const $group = $(this).closest('.rule-group');
            const groupIdx = $group.index('.rule-group');
            addRule(groupIdx, ruleIndex++);
        });

        // Remove rule group
        $(document).on('click', '.remove-rule-group', function() {
            $(this).closest('.rule-group').remove();
            updateRuleDescriptions();
        });

        // Remove rule
        $(document).on('click', '.remove-rule', function() {
            $(this).closest('.rule-row').remove();
            updateRuleDescriptions();
        });

        // Update rule description on change
        $(document).on('change', '.rule-type, .rule-operator, .rule-value', function() {
            updateRuleDescriptions();
        });

        // Form submission
        $form.on('submit', function(e) {
            e.preventDefault();
            submitSegmentForm();
        });

        // Initialize color picker
        if ($.fn.wpColorPicker) {
            $('.color-picker').wpColorPicker();
        }

        /**
         * Add a rule group
         */
        function addRuleGroup(index) {
            const template = $('#rule-group-template').html();
            if (!template) return;

            const html = template.replace(/__GROUP_INDEX__/g, index);
            $('#rules-container').append(html);
        }

        /**
         * Add a rule to a group
         */
        function addRule(groupIndex, ruleIndex) {
            const template = $('#rule-template').html();
            if (!template) return;

            const html = template
                .replace(/__GROUP_INDEX__/g, groupIndex)
                .replace(/__RULE_INDEX__/g, ruleIndex);
            
            $(`.rule-group:eq(${groupIndex}) .rule-group-rules`).append(html);
        }

        /**
         * Update rule descriptions
         */
        function updateRuleDescriptions() {
            const rules = [];
            
            $('.rule-row').each(function() {
                const type = $(this).find('.rule-type').val();
                const operator = $(this).find('.rule-operator').val();
                const value = $(this).find('.rule-value').val();
                
                if (type && operator) {
                    const ruleLabel = $(`.rule-type option[value="${type}"]`).text();
                    rules.push(`${ruleLabel} ${operator} ${value || '?'}`);
                }
            });

            if (rules.length === 0) {
                $('#rule-description').text(sakwoodSegmentAdmin.strings.loading || 'Add rules to see the description.');
            } else {
                $('#rule-description').text('Customers matching: ' + rules.join(' AND '));
            }
        }

        /**
         * Submit segment form
         */
        function submitSegmentForm() {
            const $btn = $('#save-segment');
            const isEdit = <?php echo isset($segment_id) && $segment_id ? 'true' : 'false'; ?>;
            const segmentId = <?php echo isset($segment_id) && $segment_id ? $segment_id : 0; ?>;
            
            $btn.prop('disabled', true).text(sakwoodSegmentAdmin.strings.saving || 'Saving...');

            // Collect form data
            const formData = {
                name: $('#segment_name').val(),
                description: $('#segment_description').val(),
                type: $('#segment_type').val(),
                color: $('#segment_color').val(),
                is_active: $('#segment_active').is(':checked') ? 1 : 0,
            };

            // Collect rules for dynamic segments
            if (formData.type === 'dynamic') {
                const rules = [];
                
                $('.rule-group').each(function() {
                    const groupRules = [];
                    const matchType = $(this).find('.match-type').val();
                    
                    $(this).find('.rule-row').each(function() {
                        const type = $(this).find('.rule-type').val();
                        const operator = $(this).find('.rule-operator').val();
                        const value = $(this).find('.rule-value').val();
                        
                        if (type && operator) {
                            groupRules.push({
                                type: type,
                                operator: operator,
                                value: value
                            });
                        }
                    });

                    if (groupRules.length > 0) {
                        rules.push({
                            match: matchType,
                            rules: groupRules
                        });
                    }
                });

                formData.rules = rules;
            }

            // Submit via REST API
            const url = sakwoodSegmentAdmin.apiUrl + '/segments' + 
                        (segmentId > 0 ? '/' + segmentId : '');

            $.ajax({
                url: url,
                type: isEdit ? 'PUT' : 'POST',
                contentType: 'application/json',
                headers: {
                    'X-WP-Nonce': sakwoodSegmentAdmin.nonce
                },
                data: JSON.stringify(formData),
                success: function(response) {
                    if (response.success) {
                        window.location.href = 'admin.php?page=sakwood-segments&saved=1';
                    } else {
                        alert(response.data.message || sakwoodSegmentAdmin.strings.error || 'Error saving data');
                        $btn.prop('disabled', false).text(isEdit ? 'Update Segment' : 'Create Segment');
                    }
                },
                error: function(xhr, status, error) {
                    console.error('Save error:', error);
                    alert(sakwoodSegmentAdmin.strings.error || 'Error saving data');
                    $btn.prop('disabled', false).text(isEdit ? 'Update Segment' : 'Create Segment');
                }
            });
        }
    }

    /**
     * Initialize segments list page
     */
    function initSegmentsList() {
        const $page = $('.sakwood-segments-page');
        if (!$page.length) return;

        // Evaluate segment
        $('.evaluate-segment').on('click', function() {
            const $btn = $(this);
            const segmentId = $btn.data('segment-id');
            
            $btn.prop('disabled', true).find('.dashicons').addClass('spin');
            
            $.ajax({
                url: sakwoodSegmentAdmin.apiUrl + '/segments/' + segmentId + '/evaluate',
                type: 'POST',
                headers: {
                    'X-WP-Nonce': sakwoodSegmentAdmin.nonce
                },
                success: function(response) {
                    if (response.success) {
                        alert(response.data.message);
                        location.reload();
                    } else {
                        alert(response.data.message || sakwoodSegmentAdmin.strings.error);
                    }
                },
                error: function() {
                    alert(sakwoodSegmentAdmin.strings.error || 'Error evaluating segment');
                },
                complete: function() {
                    $btn.prop('disabled', false).find('.dashicons').removeClass('spin');
                }
            });
        });

        // Delete segment
        $('.delete-segment').on('click', function() {
            if (!confirm(sakwoodSegmentAdmin.strings.confirmDelete || 'Are you sure you want to delete this segment?')) {
                return;
            }

            const $btn = $(this);
            const segmentId = $btn.data('segment-id');
            
            $.ajax({
                url: sakwoodSegmentAdmin.apiUrl + '/segments/' + segmentId,
                type: 'DELETE',
                headers: {
                    'X-WP-Nonce': sakwoodSegmentAdmin.nonce
                },
                success: function(response) {
                    if (response.success) {
                        location.reload();
                    } else {
                        alert(response.data.message || sakwoodSegmentAdmin.strings.error);
                    }
                },
                error: function() {
                    alert(sakwoodSegmentAdmin.strings.error || 'Error deleting segment');
                }
            });
        });
    }

    /**
     * Initialize members page
     */
    function initMembersPage() {
        const $page = $('.sakwood-members-page');
        if (!$page.length) return;

        // Add member
        $('#add-member-btn').on('click', function() {
            const customerId = $('#add-member-customer').val();
            
            if (!customerId) {
                alert('Please select a customer');
                return;
            }

            const $btn = $(this);
            $btn.prop('disabled', true).text('Adding...');

            $.ajax({
                url: sakwoodSegmentAdmin.apiUrl + '/segments/' + window.sakwoodSegmentId + '/members',
                type: 'POST',
                contentType: 'application/json',
                headers: {
                    'X-WP-Nonce': sakwoodSegmentAdmin.nonce
                },
                data: JSON.stringify({
                    customer_id: customerId
                }),
                success: function(response) {
                    if (response.success) {
                        location.reload();
                    } else {
                        alert(response.data.message || sakwoodSegmentAdmin.strings.error);
                        $btn.prop('disabled', false).text('Add to Segment');
                    }
                },
                error: function() {
                    alert(sakwoodSegmentAdmin.strings.error || 'Error adding member');
                    $btn.prop('disabled', false).text('Add to Segment');
                }
            });
        });

        // Remove member
        $('.remove-member').on('click', function() {
            if (!confirm('Are you sure you want to remove this customer from the segment?')) {
                return;
            }

            const $btn = $(this);
            const segmentId = $btn.data('segment-id');
            const customerId = $btn.data('customer-id');

            $.ajax({
                url: sakwoodSegmentAdmin.apiUrl + '/segments/' + segmentId + '/members/' + customerId,
                type: 'DELETE',
                headers: {
                    'X-WP-Nonce': sakwoodSegmentAdmin.nonce
                },
                success: function(response) {
                    if (response.success) {
                        location.reload();
                    } else {
                        alert(response.data.message || sakwoodSegmentAdmin.strings.error);
                    }
                },
                error: function() {
                    alert(sakwoodSegmentAdmin.strings.error || 'Error removing member');
                }
            });
        });

        // Evaluate segment
        $('.evaluate-segment').on('click', function() {
            const $btn = $(this);
            const segmentId = $btn.data('segment-id');
            
            $btn.prop('disabled', true).find('.dashicons').addClass('spin');
            
            $.ajax({
                url: sakwoodSegmentAdmin.apiUrl + '/segments/' + segmentId + '/evaluate',
                type: 'POST',
                headers: {
                    'X-WP-Nonce': sakwoodSegmentAdmin.nonce
                },
                success: function(response) {
                    if (response.success) {
                        alert(response.data.message);
                        location.reload();
                    } else {
                        alert(response.data.message || sakwoodSegmentAdmin.strings.error);
                    }
                },
                error: function() {
                    alert(sakwoodSegmentAdmin.strings.error || 'Error evaluating segment');
                },
                complete: function() {
                    $btn.prop('disabled', false).find('.dashicons').removeClass('spin');
                }
            });
        });
    }

})(jQuery);
