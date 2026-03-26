<?php
/**
 * Admin View: Segment Form (Create/Edit)
 * 
 * @package SakwoodIntegration
 * @since 1.1.0
 */

if (!defined('ABSPATH')) {
    exit;
}

// Initialize database
Sakwood_Segment_Database::init();

// Check if editing existing segment
$segment_id = isset($_GET['segment_id']) ? intval($_GET['segment_id']) : 0;
$segment = $segment_id ? Sakwood_Segment_Database::get_segment($segment_id) : null;
$is_edit = $segment !== null;

// Get rule types
$rule_types = Sakwood_Segment_Rules_Engine::get_rule_types();
?>

<div class="wrap sakwood-segment-form-page">
    <h1 class="wp-heading-inline">
        <?php echo $is_edit ? __('Edit Segment', 'sakwood-integration') : __('Add New Segment', 'sakwood-integration'); ?>
    </h1>
    
    <a href="<?php echo admin_url('admin.php?page=sakwood-segments'); ?>" class="page-title-action">
        <?php _e('Back to Segments', 'sakwood-integration'); ?>
    </a>

    <hr class="wp-header-end">

    <form id="segment-form" method="post" action="">
        <div class="sakwood-form-grid">
            <!-- Main Settings -->
            <div class="sakwood-form-main">
                <div class="postbox">
                    <h2 class="hndle"><span><?php _e('Segment Information', 'sakwood-integration'); ?></span></h2>
                    <div class="inside">
                        <table class="form-table">
                            <tr>
                                <th scope="row">
                                    <label for="segment_name"><?php _e('Name', 'sakwood-integration'); ?> <span class="required">*</span></label>
                                </th>
                                <td>
                                    <input type="text" 
                                           id="segment_name" 
                                           name="name" 
                                           class="regular-text" 
                                           value="<?php echo esc_attr($segment['name'] ?? ''); ?>" 
                                           required />
                                    <p class="description"><?php _e('Enter a descriptive name for this segment.', 'sakwood-integration'); ?></p>
                                </td>
                            </tr>
                            
                            <tr>
                                <th scope="row">
                                    <label for="segment_description"><?php _e('Description', 'sakwood-integration'); ?></label>
                                </th>
                                <td>
                                    <textarea id="segment_description" 
                                              name="description" 
                                              class="large-text" 
                                              rows="3"><?php echo esc_textarea($segment['description'] ?? ''); ?></textarea>
                                    <p class="description"><?php _e('Brief description of this segment\'s purpose.', 'sakwood-integration'); ?></p>
                                </td>
                            </tr>
                            
                            <tr>
                                <th scope="row">
                                    <label for="segment_type"><?php _e('Type', 'sakwood-integration'); ?></label>
                                </th>
                                <td>
                                    <select id="segment_type" name="type" class="regular-text">
                                        <option value="dynamic" <?php selected($segment['type'] ?? '', 'dynamic'); ?>>
                                            <?php _e('Dynamic (Automatic)', 'sakwood-integration'); ?>
                                        </option>
                                        <option value="manual" <?php selected($segment['type'] ?? '', 'manual'); ?>>
                                            <?php _e('Manual', 'sakwood-integration'); ?>
                                        </option>
                                    </select>
                                    <p class="description">
                                        <strong><?php _e('Dynamic:', 'sakwood-integration'); ?></strong> 
                                        <?php _e('Customers are automatically added/removed based on rules.', 'sakwood-integration'); ?><br>
                                        <strong><?php _e('Manual:', 'sakwood-integration'); ?></strong> 
                                        <?php _e('You manually select which customers belong.', 'sakwood-integration'); ?>
                                    </p>
                                </td>
                            </tr>
                            
                            <tr>
                                <th scope="row">
                                    <label for="segment_color"><?php _e('Color', 'sakwood-integration'); ?></label>
                                </th>
                                <td>
                                    <input type="text" 
                                           id="segment_color" 
                                           name="color" 
                                           class="color-picker" 
                                           value="<?php echo esc_attr($segment['color'] ?? '#3B82F6'); ?>" />
                                    <p class="description"><?php _e('Color used to identify this segment in the UI.', 'sakwood-integration'); ?></p>
                                </td>
                            </tr>
                            
                            <tr>
                                <th scope="row">
                                    <label for="segment_active"><?php _e('Status', 'sakwood-integration'); ?></label>
                                </th>
                                <td>
                                    <label>
                                        <input type="checkbox" 
                                               id="segment_active" 
                                               name="is_active" 
                                               value="1" 
                                               <?php checked($segment['is_active'] ?? 1, 1); ?> />
                                        <?php _e('Active', 'sakwood-integration'); ?>
                                    </label>
                                    <p class="description"><?php _e('Inactive segments won\'t evaluate rules or send notifications.', 'sakwood-integration'); ?></p>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>

                <!-- Rules Editor (Dynamic Segments Only) -->
                <div id="rules-editor-container" class="postbox" style="<?php echo ($segment['type'] ?? '') === 'manual' ? 'display:none;' : ''; ?>">
                    <h2 class="hndle">
                        <span><?php _e('Segmentation Rules', 'sakwood-integration'); ?></span>
                        <button type="button" id="add-rule-group" class="button button-small" style="float:right;">
                            <span class="dashicons dashicons-plus-alt"></span>
                            <?php _e('Add Rule Group', 'sakwood-integration'); ?>
                        </button>
                    </h2>
                    <div class="inside">
                        <div id="rules-container">
                            <!-- Rules will be added here dynamically -->
                        </div>
                        
                        <div class="rule-preview">
                            <h3><?php _e('Rule Preview', 'sakwood-integration'); ?></h3>
                            <p id="rule-description"><?php _e('Add rules to see the description.', 'sakwood-integration'); ?></p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Sidebar -->
            <div class="sakwood-form-sidebar">
                <!-- Save Box -->
                <div class="postbox">
                    <h2 class="hndle"><span><?php _e('Save', 'sakwood-integration'); ?></span></h2>
                    <div class="inside">
                        <button type="submit" id="save-segment" class="button button-primary button-large" style="width:100%;">
                            <?php echo $is_edit ? __('Update Segment', 'sakwood-integration') : __('Create Segment', 'sakwood-integration'); ?>
                        </button>
                        <p class="description" style="margin-top:10px;">
                            <?php _e('Dynamic segments will evaluate rules immediately after saving.', 'sakwood-integration'); ?>
                        </p>
                    </div>
                </div>

                <!-- Help Box -->
                <div class="postbox">
                    <h2 class="hndle"><span><?php _e('Tips', 'sakwood-integration'); ?></span></h2>
                    <div class="inside">
                        <ul style="margin:10px 0; padding-left:20px;">
                            <li><?php _e('Use rule groups to combine multiple conditions.', 'sakwood-integration'); ?></li>
                            <li><?php _e('All rules in a group must match (AND logic).', 'sakwood-integration'); ?></li>
                            <li><?php _e('Use multiple groups for OR logic.', 'sakwood-integration'); ?></li>
                            <li><?php _e('Test with small segments first.', 'sakwood-integration'); ?></li>
                        </ul>
                    </div>
                </div>

                <!-- Existing Segment Stats -->
                <?php if ($is_edit && $segment) : ?>
                <div class="postbox">
                    <h2 class="hndle"><span><?php _e('Current Stats', 'sakwood-integration'); ?></span></h2>
                    <div class="inside">
                        <div class="stat-row">
                            <strong><?php _e('Members:', 'sakwood-integration'); ?></strong>
                            <span><?php echo number_format_i18n($segment['customer_count']); ?></span>
                        </div>
                        <div class="stat-row">
                            <strong><?php _e('Revenue:', 'sakwood-integration'); ?></strong>
                            <span><?php echo number_format_i18n($segment['total_revenue'], 2); ?> ฿</span>
                        </div>
                        <div class="stat-row">
                            <strong><?php _e('Created:', 'sakwood-integration'); ?></strong>
                            <span><?php echo date_i18n(get_option('date_format'), strtotime($segment['created_at'])); ?></span>
                        </div>
                    </div>
                </div>
                <?php endif; ?>
            </div>
        </div>
    </form>
</div>

<!-- Rule Template -->
<script type="text/template" id="rule-group-template">
    <div class="rule-group">
        <div class="rule-group-header">
            <strong><?php _e('Rule Group', 'sakwood-integration'); ?></strong>
            <select name="rule_groups[__GROUP_INDEX__][match]" class="match-type">
                <option value="all"><?php _e('Match ALL (AND)', 'sakwood-integration'); ?></option>
                <option value="any"><?php _e('Match ANY (OR)', 'sakwood-integration'); ?></option>
            </select>
            <button type="button" class="button remove-rule-group">
                <span class="dashicons dashicons-trash"></span>
            </button>
        </div>
        <div class="rule-group-rules">
            <!-- Rules go here -->
        </div>
        <button type="button" class="button add-rule">
            <span class="dashicons dashicons-plus-alt"></span>
            <?php _e('Add Rule', 'sakwood-integration'); ?>
        </button>
    </div>
</script>

<script type="text/template" id="rule-template">
    <div class="rule-row">
        <select name="rule_groups[__GROUP_INDEX__][rules][__RULE_INDEX__][type]" class="rule-type">
            <option value=""><?php _e('Select rule type...', 'sakwood-integration'); ?></option>
            <?php foreach ($rule_types as $category => $config) : ?>
                <optgroup label="<?php echo esc_attr($config['label']); ?>">
                    <?php foreach ($config['rules'] as $rule_key => $rule_label) : ?>
                        <option value="<?php echo esc_attr($rule_key); ?>" data-category="<?php echo esc_attr($category); ?>">
                            <?php echo esc_html($rule_label); ?>
                        </option>
                    <?php endforeach; ?>
                </optgroup>
            <?php endforeach; ?>
        </select>
        
        <select name="rule_groups[__GROUP_INDEX__][rules][__RULE_INDEX__][operator]" class="rule-operator">
            <option value="=">=</option>
            <option value="!=">!=</option>
            <option value=">">&gt;</option>
            <option value=">=">&gt;=</option>
            <option value="<">&lt;</option>
            <option value="<=">&lt;=</option>
            <option value="in"><?php _e('In', 'sakwood-integration'); ?></option>
            <option value="not_in"><?php _e('Not In', 'sakwood-integration'); ?></option>
            <option value="within"><?php _e('Within', 'sakwood-integration'); ?></option>
            <option value="not_within"><?php _e('Not Within', 'sakwood-integration'); ?></option>
        </select>
        
        <input type="text" name="rule_groups[__GROUP_INDEX__][rules][__RULE_INDEX__][value]" class="rule-value" placeholder="<?php _e('Value...', 'sakwood-integration'); ?>" />
        
        <button type="button" class="button remove-rule">
            <span class="dashicons dashicons-no"></span>
        </button>
    </div>
</script>

<style>
.sakwood-segment-form-page {
    max-width: 1200px;
}

.sakwood-form-grid {
    display: grid;
    grid-template-columns: 1fr 300px;
    gap: 20px;
    margin-top: 20px;
}

.sakwood-form-main {
    min-width: 0;
}

.sakwood-form-sidebar {
    min-width: 0;
}

.required {
    color: #d63638;
}

.rule-group {
    border: 1px solid #c3c4c7;
    border-radius: 4px;
    padding: 15px;
    margin-bottom: 15px;
    background: #f6f7f7;
}

.rule-group-header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 15px;
}

.rule-group-header strong {
    flex: 1;
}

.match-type {
    min-width: 150px;
}

.rule-group-rules {
    margin-bottom: 10px;
}

.rule-row {
    display: grid;
    grid-template-columns: 2fr 1.5fr 2fr auto;
    gap: 10px;
    margin-bottom: 10px;
    align-items: center;
}

.rule-type,
.rule-operator,
.rule-value {
    width: 100%;
}

.rule-preview {
    background: #f0f0f1;
    padding: 15px;
    border-radius: 4px;
    margin-top: 20px;
}

.rule-preview h3 {
    margin: 0 0 10px 0;
    font-size: 14px;
}

#rule-description {
    margin: 0;
    color: #646970;
    font-size: 14px;
}

.stat-row {
    display: flex;
    justify-content: space-between;
    padding: 8px 0;
    border-bottom: 1px solid #f0f0f1;
}

.stat-row:last-child {
    border-bottom: none;
}

.remove-rule-group,
.remove-rule {
    color: #d63638;
}

.remove-rule-group:hover,
.remove-rule:hover {
    color: #b32d2e;
    border-color: #b32d2e;
}
</style>

<script>
jQuery(document).ready(function($) {
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
        const template = $('#rule-group-template').html();
        const html = template.replace(/__GROUP_INDEX__/g, groupIndex++);
        $('#rules-container').append(html);
    });

    // Add rule to group (delegated)
    $(document).on('click', '.add-rule', function() {
        const $group = $(this).closest('.rule-group');
        const groupIdx = $group.index('.rule-group');
        const template = $('#rule-template').html();
        const html = template
            .replace(/__GROUP_INDEX__/g, groupIdx)
            .replace(/__RULE_INDEX__/g, ruleIndex++);
        $group.find('.rule-group-rules').append(html);
    });

    // Remove rule group
    $(document).on('click', '.remove-rule-group', function() {
        $(this).closest('.rule-group').remove();
    });

    // Remove rule
    $(document).on('click', '.remove-rule', function() {
        $(this).closest('.rule-row').remove();
    });

    // Update rule description
    $(document).on('change', '.rule-type, .rule-operator', function() {
        updateRuleDescription();
    });

    function updateRuleDescription() {
        const rules = [];
        $('.rule-row').each(function() {
            const type = $(this).find('.rule-type').val();
            const operator = $(this).find('.rule-operator').val();
            const value = $(this).find('.rule-value').val();
            
            if (type && operator) {
                rules.push(type + ' ' + operator + ' ' + (value || '?'));
            }
        });

        if (rules.length === 0) {
            $('#rule-description').text('<?php _e('Add rules to see the description.', 'sakwood-integration'); ?>');
        } else {
            $('#rule-description').text('<?php _e('Customers matching:', 'sakwood-integration'); ?> ' + rules.join(' AND '));
        }
    }

    // Form submission
    $('#segment-form').on('submit', function(e) {
        e.preventDefault();
        
        const $btn = $('#save-segment');
        $btn.prop('disabled', true).text(sakwoodSegmentAdmin.strings.saving);

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
        const url = '<?php echo rest_url('sakwood/v1/segments'); ?>' + 
                    (<?php echo $segment_id ? $segment_id : 0; ?> > 0 
                        ? '/' + <?php echo $segment_id; ?> 
                        : '');

        $.ajax({
            url: url,
            type: <?php echo $is_edit ? 'PUT' : 'POST'; ?>,
            contentType: 'application/json',
            headers: {
                'X-WP-Nonce': sakwoodSegmentAdmin.nonce
            },
            data: JSON.stringify(formData),
            success: function(response) {
                if (response.success) {
                    window.location.href = '<?php echo admin_url('admin.php?page=sakwood-segments&saved=1'); ?>';
                } else {
                    alert(response.data.message || sakwoodSegmentAdmin.strings.error);
                    $btn.prop('disabled', false).text(<?php echo $is_edit ? "__('Update Segment', 'sakwood-integration')" : "__('Create Segment', 'sakwood-integration')"; ?>);
                }
            },
            error: function() {
                alert(sakwoodSegmentAdmin.strings.error);
                $btn.prop('disabled', false).text(<?php echo $is_edit ? "__('Update Segment', 'sakwood-integration')" : "__('Create Segment', 'sakwood-integration')"; ?>);
            }
        });
    });

    // Initialize color picker
    $('.color-picker').wpColorPicker();
});
</script>
