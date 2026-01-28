/**
 * Sakwood CRM Admin JavaScript
 * Handles AJAX requests, modals, and interactive features
 */

(function($) {
    'use strict';

    // Global CRM Admin object
    var SakwoodCRMAdmin = {

        /**
         * Initialize all CRM admin functionality
         */
        init: function() {
            this.initModals();
            this.initAjaxForms();
            this.initQuickActions();
            this.initFilters();
            this.initExport();
        },

        /**
         * Modal Management
         */
        initModals: function() {
            // Open modal
            $(document).on('click', '.crm-add-interaction-btn, .crm-add-task-btn', function(e) {
                e.preventDefault();
                var modalId = $(this).data('modal') || '#crm-interaction-modal';
                SakwoodCRMAdmin.openModal(modalId);
            });

            // Close modal
            $(document).on('click', '.crm-modal', function(e) {
                if (e.target === this) {
                    SakwoodCRMAdmin.closeModal(this);
                }
            });

            // Close modal on button click
            $(document).on('click', '.crm-modal .button:not(.button-primary)', function(e) {
                if (!$(this).hasClass('button-primary')) {
                    var modal = $(this).closest('.crm-modal');
                    SakwoodCRMAdmin.closeModal(modal);
                }
            });

            // Close modal on Escape key
            $(document).on('keydown', function(e) {
                if (e.key === 'Escape') {
                    $('.crm-modal.active').first().each(function() {
                        SakwoodCRMAdmin.closeModal(this);
                    });
                }
            });
        },

        /**
         * Open a modal
         */
        openModal: function(modal) {
            var $modal = typeof modal === 'string' ? $(modal) : $(modal);
            $modal.addClass('active');
            $('body').css('overflow', 'hidden');
        },

        /**
         * Close a modal
         */
        closeModal: function(modal) {
            var $modal = typeof modal === 'string' ? $(modal) : $(modal);
            $modal.removeClass('active');
            $('body').css('overflow', '');

            // Reset form after closing
            setTimeout(function() {
                $modal.find('form').each(function() {
                    this.reset();
                    $(this).find('input[type="hidden"]').not('[name="action"]').val('');
                });
            }, 300);
        },

        /**
         * AJAX Form Submissions
         */
        initAjaxForms: function() {
            // Add Interaction form
            $(document).on('submit', '#crm-interaction-form', function(e) {
                e.preventDefault();
                SakwoodCRMAdmin.saveInteraction(this);
            });

            // Add/Edit Task form
            $(document).on('submit', '#crm-task-form', function(e) {
                e.preventDefault();
                SakwoodCRMAdmin.saveTask(this);
            });
        },

        /**
         * Save Interaction via AJAX
         */
        saveInteraction: function(form) {
            var $form = $(form);
            var data = $form.serialize() + '&action=sakwood_crm_save_interaction';
            var $modal = $form.closest('.crm-modal');

            SakwoodCRMAdmin.showLoading($modal);

            $.ajax({
                url: ajaxurl,
                type: 'POST',
                data: data,
                success: function(response) {
                    SakwoodCRMAdmin.hideLoading($modal);

                    if (response.success) {
                        SakwoodCRMAdmin.showNotice('success', response.data.message || __('Interaction saved successfully.', 'sakwood'));
                        SakwoodCRMAdmin.closeModal($modal);

                        // Reload page after short delay to show new interaction
                        setTimeout(function() {
                            location.reload();
                        }, 1000);
                    } else {
                        SakwoodCRMAdmin.showNotice('error', response.data.message || __('Error saving interaction.', 'sakwood'));
                    }
                },
                error: function() {
                    SakwoodCRMAdmin.hideLoading($modal);
                    SakwoodCRMAdmin.showNotice('error', __('Network error. Please try again.', 'sakwood'));
                }
            });
        },

        /**
         * Save Task via AJAX
         */
        saveTask: function(form) {
            var $form = $(form);
            var data = $form.serialize() + '&action=sakwood_crm_save_task';
            var $modal = $form.closest('.crm-modal');

            SakwoodCRMAdmin.showLoading($modal);

            $.ajax({
                url: ajaxurl,
                type: 'POST',
                data: data,
                success: function(response) {
                    SakwoodCRMAdmin.hideLoading($modal);

                    if (response.success) {
                        SakwoodCRMAdmin.showNotice('success', response.data.message || __('Task saved successfully.', 'sakwood'));
                        SakwoodCRMAdmin.closeModal($modal);

                        // Reload page after short delay to show new task
                        setTimeout(function() {
                            location.reload();
                        }, 1000);
                    } else {
                        SakwoodCRMAdmin.showNotice('error', response.data.message || __('Error saving task.', 'sakwood'));
                    }
                },
                error: function() {
                    SakwoodCRMAdmin.hideLoading($modal);
                    SakwoodCRMAdmin.showNotice('error', __('Network error. Please try again.', 'sakwood'));
                }
            });
        },

        /**
         * Quick Actions
         */
        initQuickActions: function() {
            // Complete Task
            $(document).on('click', '.crm-complete-task-action, .crm-complete-task', function(e) {
                e.preventDefault();
                var taskId = $(this).data('task-id');

                if (confirm(__('Are you sure you want to mark this task as complete?', 'sakwood'))) {
                    SakwoodCRMAdmin.completeTask(taskId);
                }
            });

            // Reopen Task
            $(document).on('click', '.crm-reopen-task-action', function(e) {
                e.preventDefault();
                var taskId = $(this).data('task-id');

                if (confirm(__('Are you sure you want to reopen this task?', 'sakwood'))) {
                    SakwoodCRMAdmin.reopenTask(taskId);
                }
            });

            // Delete Task
            $(document).on('click', '.crm-delete-task-action', function(e) {
                e.preventDefault();
                var taskId = $(this).data('task-id');

                if (confirm(__('Are you sure you want to delete this task? This cannot be undone.', 'sakwood'))) {
                    SakwoodCRMAdmin.deleteTask(taskId);
                }
            });

            // Delete Interaction
            $(document).on('click', '.crm-delete-interaction', function(e) {
                e.preventDefault();
                var interactionId = $(this).data('interaction-id');

                if (confirm(__('Are you sure you want to delete this interaction? This cannot be undone.', 'sakwood'))) {
                    SakwoodCRMAdmin.deleteInteraction(interactionId);
                }
            });

            // View Interaction
            $(document).on('click', '.crm-view-interaction', function(e) {
                e.preventDefault();
                var interactionId = $(this).data('interaction-id');
                SakwoodCRMAdmin.viewInteraction(interactionId);
            });

            // Edit Task
            $(document).on('click', '.crm-edit-task-action', function(e) {
                e.preventDefault();
                var taskId = $(this).data('task-id');
                SakwoodCRMAdmin.editTask(taskId);
            });
        },

        /**
         * Complete Task
         */
        completeTask: function(taskId) {
            $.ajax({
                url: ajaxurl,
                type: 'POST',
                data: {
                    action: 'sakwood_crm_complete_task',
                    task_id: taskId,
                    nonce: sakwoodCRM.nonce
                },
                success: function(response) {
                    if (response.success) {
                        SakwoodCRMAdmin.showNotice('success', __('Task completed successfully.', 'sakwood'));
                        setTimeout(function() {
                            location.reload();
                        }, 1000);
                    } else {
                        SakwoodCRMAdmin.showNotice('error', response.data.message || __('Error completing task.', 'sakwood'));
                    }
                },
                error: function() {
                    SakwoodCRMAdmin.showNotice('error', __('Network error. Please try again.', 'sakwood'));
                }
            });
        },

        /**
         * Reopen Task
         */
        reopenTask: function(taskId) {
            $.ajax({
                url: ajaxurl,
                type: 'POST',
                data: {
                    action: 'sakwood_crm_reopen_task',
                    task_id: taskId,
                    nonce: sakwoodCRM.nonce
                },
                success: function(response) {
                    if (response.success) {
                        SakwoodCRMAdmin.showNotice('success', __('Task reopened successfully.', 'sakwood'));
                        setTimeout(function() {
                            location.reload();
                        }, 1000);
                    } else {
                        SakwoodCRMAdmin.showNotice('error', response.data.message || __('Error reopening task.', 'sakwood'));
                    }
                },
                error: function() {
                    SakwoodCRMAdmin.showNotice('error', __('Network error. Please try again.', 'sakwood'));
                }
            });
        },

        /**
         * Delete Task
         */
        deleteTask: function(taskId) {
            $.ajax({
                url: ajaxurl,
                type: 'POST',
                data: {
                    action: 'sakwood_crm_delete_task',
                    task_id: taskId,
                    nonce: sakwoodCRM.nonce
                },
                success: function(response) {
                    if (response.success) {
                        SakwoodCRMAdmin.showNotice('success', __('Task deleted successfully.', 'sakwood'));
                        setTimeout(function() {
                            location.reload();
                        }, 1000);
                    } else {
                        SakwoodCRMAdmin.showNotice('error', response.data.message || __('Error deleting task.', 'sakwood'));
                    }
                },
                error: function() {
                    SakwoodCRMAdmin.showNotice('error', __('Network error. Please try again.', 'sakwood'));
                }
            });
        },

        /**
         * Delete Interaction
         */
        deleteInteraction: function(interactionId) {
            $.ajax({
                url: ajaxurl,
                type: 'POST',
                data: {
                    action: 'sakwood_crm_delete_interaction',
                    interaction_id: interactionId,
                    nonce: sakwoodCRM.nonce
                },
                success: function(response) {
                    if (response.success) {
                        SakwoodCRMAdmin.showNotice('success', __('Interaction deleted successfully.', 'sakwood'));
                        setTimeout(function() {
                            location.reload();
                        }, 1000);
                    } else {
                        SakwoodCRMAdmin.showNotice('error', response.data.message || __('Error deleting interaction.', 'sakwood'));
                    }
                },
                error: function() {
                    SakwoodCRMAdmin.showNotice('error', __('Network error. Please try again.', 'sakwood'));
                }
            });
        },

        /**
         * View Interaction
         */
        viewInteraction: function(interactionId) {
            $.ajax({
                url: ajaxurl,
                type: 'POST',
                data: {
                    action: 'sakwood_crm_get_interaction',
                    interaction_id: interactionId,
                    nonce: sakwoodCRM.nonce
                },
                success: function(response) {
                    if (response.success) {
                        var interaction = response.data;
                        var content = '<div style="margin-bottom: 15px;">' +
                            '<strong>' + __('Type:', 'sakwood') + '</strong> ' + interaction.interaction_type + '<br>' +
                            '<strong>' + __('Subject:', 'sakwood') + '</strong> ' + interaction.subject + '<br>' +
                            '<strong>' + __('Date:', 'sakwood') + '</strong> ' + interaction.created_at + '<br>' +
                            '<strong>' + __('By:', 'sakwood') + '</strong> ' + interaction.created_by_name +
                            '</div>';

                        if (interaction.message) {
                            content += '<div style="background: #f0f0f1; padding: 15px; border-radius: 4px;">' +
                                '<strong>' + __('Message:', 'sakwood') + '</strong><br>' +
                                '<p style="margin-top: 10px; white-space: pre-wrap;">' + interaction.message + '</p>' +
                                '</div>';
                        }

                        $('#crm-view-interaction-content').html(content);
                        SakwoodCRMAdmin.openModal('#crm-view-interaction-modal');
                    } else {
                        SakwoodCRMAdmin.showNotice('error', __('Error loading interaction.', 'sakwood'));
                    }
                },
                error: function() {
                    SakwoodCRMAdmin.showNotice('error', __('Network error. Please try again.', 'sakwood'));
                }
            });
        },

        /**
         * Edit Task (load data into modal)
         */
        editTask: function(taskId) {
            $.ajax({
                url: ajaxurl,
                type: 'POST',
                data: {
                    action: 'sakwood_crm_get_task',
                    task_id: taskId,
                    nonce: sakwoodCRM.nonce
                },
                success: function(response) {
                    if (response.success) {
                        var task = response.data;

                        // Populate form
                        $('#crm-task-id').val(task.id);
                        $('#crm-task-customer-id').val(task.customer_id || '');
                        $('#crm-task-title').val(task.title);
                        $('#crm-task-description').val(task.description || '');
                        $('#crm-task-priority').val(task.priority);
                        $('#crm-task-due-date').val(task.due_date || '');
                        $('#crm-task-type').val(task.task_type || 'other');
                        $('#crm-task-assigned-to').val(task.assigned_to || '');

                        $('#crm-task-modal-title').text('<?php _e('Edit Task', 'sakwood'); ?>');
                        SakwoodCRMAdmin.openModal('#crm-task-modal');
                    } else {
                        SakwoodCRMAdmin.showNotice('error', __('Error loading task.', 'sakwood'));
                    }
                },
                error: function() {
                    SakwoodCRMAdmin.showNotice('error', __('Network error. Please try again.', 'sakwood'));
                }
            });
        },

        /**
         * Filter Management
         */
        initFilters: function() {
            // Auto-submit filters on change
            $('.crm-filters select').on('change', function() {
                if ($(this).val() !== '') {
                    $(this).closest('form').submit();
                }
            });

            // Date range toggle in reports
            $('#crm-date-range').on('change', function() {
                if ($(this).val() === 'custom') {
                    $('#crm-custom-date-container').slideDown();
                } else {
                    $('#crm-custom-date-container').slideUp();
                }
            });
        },

        /**
         * Export Functionality
         */
        initExport: function() {
            $(document).on('click', '#crm-export-interactions', function(e) {
                e.preventDefault();

                // Get current filters
                var filters = window.location.search.substring(1);
                var exportUrl = ajaxurl + '?action=sakwood_crm_export_interactions&' + filters;

                // Trigger download
                window.location.href = exportUrl;
            });
        },

        /**
         * Show Loading State
         */
        showLoading: function(element) {
            var $el = $(element);
            $el.addClass('crm-loading');
        },

        /**
         * Hide Loading State
         */
        hideLoading: function(element) {
            var $el = $(element);
            $el.removeClass('crm-loading');
        },

        /**
         * Show Admin Notice
         */
        showNotice: function(type, message) {
            var className = type === 'success' ? 'notice-success' : 'notice-error';
            var noticeHTML = '<div class="notice ' + className + ' is-dismissible"><p>' + message + '</p></div>';

            // Insert notice at top of wrap
            $('.wrap').first().prepend(noticeHTML);

            // Auto-dismiss after 5 seconds
            setTimeout(function() {
                $('.notice.' + className).first().find('.notice-dismiss').trigger('click');
            }, 5000);

            // Make dismissible
            $(document).on('click', '.notice-dismiss', function() {
                $(this).closest('.notice').fadeOut();
            });
        }
    };

    // Initialize when document is ready
    $(document).ready(function() {
        SakwoodCRMAdmin.init();
    });

    // Expose to global scope
    window.SakwoodCRMAdmin = SakwoodCRMAdmin;

    // Legacy modal functions for inline JS
    window.openModal = SakwoodCRMAdmin.openModal;
    window.closeModal = SakwoodCRMAdmin.closeModal;

})(jQuery);

/**
 * Fallback translation function
 */
function __(text, domain) {
    return text;
}
