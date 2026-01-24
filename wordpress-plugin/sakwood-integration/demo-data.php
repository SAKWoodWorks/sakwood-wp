<?php
/**
 * Demo Data Generator for Sakwood Features
 *
 * Usage: Visit /wp-admin/?sakwood_generate_demo_data=1 in WordPress admin
 */

add_action('admin_init', 'sakwood_generate_demo_data');

function sakwood_generate_demo_data() {
    // Check if user is admin and trigger is set
    if (!current_user_can('manage_options') || !isset($_GET['sakwood_generate_demo_data'])) {
        return;
    }

    // Verify nonce
    if (!isset($_GET['_wpnonce']) || !wp_verify_nonce($_GET['_wpnonce'], 'sakwood_demo_data')) {
        wp_die('Security check failed');
    }

    $results = array();

    // Generate FAQs
    $results['faqs'] = sakwood_generate_demo_faqs();

    // Generate Videos
    $results['videos'] = sakwood_generate_demo_videos();

    // Generate Knowledge Base articles
    $results['knowledge'] = sakwood_generate_demo_knowledge();

    // Generate CRM data
    $results['crm'] = sakwood_generate_demo_crm();

    // Display results
    echo '<html><head><style>body{font-family:sans-serif;padding:40px;} .success{color:green;} .error{color:red;} pre{background:#f5f5f5;padding:10px;}</style></head><body>';
    echo '<h1>Sakwood Demo Data Generated</h1>';

    foreach ($results as $type => $result) {
        echo '<h2>' . ucfirst($type) . '</h2>';
        echo '<pre>' . print_r($result, true) . '</pre>';
    }

    echo '<p><a href="' . admin_url() . '">Return to Dashboard</a></p>';
    echo '</body></html>';
    exit;
}

// Add admin menu link
add_action('admin_menu', 'sakwood_demo_data_menu');
function sakwood_demo_data_menu() {
    add_submenu_page(
        'tools.php',
        'Demo Data',
        'Demo Data',
        'manage_options',
        'sakwood-demo-data',
        'sakwood_demo_data_page'
    );
}

function sakwood_demo_data_page() {
    $nonce = wp_create_nonce('sakwood_demo_data');
    $url = admin_url('?sakwood_generate_demo_data=1&_wpnonce=' . $nonce);
    ?>
    <div class="wrap">
        <h1>Sakwood Demo Data Generator</h1>
        <p>Click the button below to generate demo data for FAQ, Video Gallery, Knowledge Base, and CRM features.</p>
        <p><strong>Warning:</strong> This will create duplicate entries if run multiple times.</p>
        <p><a href="<?php echo esc_url($url); ?>" class="button button-primary">Generate Demo Data</a></p>
    </div>
    <?php
}

/**
 * Generate Demo FAQs
 */
function sakwood_generate_demo_faqs() {
    $faqs = array(
        array(
            'title_th' => 'ค่าขนส่งคืออะไร?',
            'content_th' => 'เราให้บริการจัดส่งสินค้าทั่วประเทศไทย โดยคำนวณค่าขนส่งตามจังหวัดและน้ำหนักสินค้า ออเดอร์ที่มีมูลค่า超过 10,000 บาท จัดส่งฟรี',
            'title_en' => 'What are the shipping costs?',
            'content_en' => 'We deliver nationwide in Thailand. Shipping is calculated by province and weight. Orders over 10,000 THB get free shipping.',
            'category' => 'shipping',
            'order' => 1,
            'featured' => 1
        ),
        array(
            'title_th' => 'ชำระเงินอย่างไร?',
            'content_th' => 'รับชำระผ่าน PromptPay, โอนเงินผ่านธนาคาร, และเก็บเงินปลายทาง สำหรับลูกค้าส่งรับเครดิต 30 วัน',
            'title_en' => 'How can I pay?',
            'content_en' => 'We accept PromptPay, bank transfer, and cash on delivery. Wholesale customers get 30-day credit terms.',
            'category' => 'payment',
            'order' => 2,
            'featured' => 1
        ),
        array(
            'title_th' => 'ไม้ซุงเกรด AAA คืออะไร?',
            'content_th' => 'ไม้ซุงเกรด AAA คือไม้คุณภาพสูงสุด ไม้มีความแข็งแรง ไม่มีตาไม้เน่าเป็นโรค และมีความชื้นต่ำกว่า 15%',
            'title_en' => 'What is Grade AAA pine wood?',
            'content_en' => 'Grade AAA pine wood is our highest quality. It is strong, free of rot and disease, with moisture content below 15%.',
            'category' => 'products',
            'order' => 3,
            'featured' => 1
        ),
        array(
            'title_th' => 'สมัครขายส่งอย่างไร?',
            'content_th' => 'สมัครผ่านหน้าเว็บไซต์ กรอกข้อมูลธุรกิจและเลขประจำตัวผู้เสียภาษี อนุมัติภายใน 2-3 วันทำการ',
            'title_en' => 'How to apply for wholesale?',
            'content_en' => 'Apply through our website by providing business info and tax ID. Approval takes 2-3 business days.',
            'category' => 'wholesale',
            'order' => 4,
            'featured' => 0
        ),
        array(
            'title_th' => 'รับเปลี่ยนคืนสินค้าไหม?',
            'content_th' => 'รับเปลี่ยนคืนภายใน 7 วัน หากสินค้ามีข้อบกพร่องจากผู้ขาย ติดต่อเราทาง LINE หรือโทร',
            'title_en' => 'Do you accept returns?',
            'content_en' => 'We accept returns within 7 days for manufacturing defects. Contact us via LINE or phone.',
            'category' => 'returns',
            'order' => 5,
            'featured' => 0
        ),
        array(
            'title_th' => 'เปิดบริการกี่โมง?',
            'content_th' => 'เปิดบริการวันจันทร์-เสาร์ 8:00-17:00 น. หยุดวันอาทิตย์และวันหยุดนักขัตฤกษ์',
            'title_en' => 'What are your business hours?',
            'content_en' => 'Open Monday-Saturday 8:00-17:00. Closed Sundays and public holidays.',
            'category' => 'general',
            'order' => 6,
            'featured' => 0
        ),
    );

    $created = array();
    foreach ($faqs as $faq) {
        $post_id = wp_insert_post(array(
            'post_title' => $faq['title_th'],
            'post_content' => $faq['content_th'],
            'post_type' => 'faq',
            'post_status' => 'publish',
        ));

        if ($post_id && !is_wp_error($post_id)) {
            // Add English translations
            update_post_meta($post_id, '_faq_title_en', $faq['title_en']);
            update_post_meta($post_id, '_faq_content_en', $faq['content_en']);
            update_post_meta($post_id, '_faq_order', $faq['order']);
            update_post_meta($post_id, '_faq_featured', $faq['featured']);

            // Set category
            wp_set_object_terms($post_id, $faq['category'], 'faq_category');

            $created[] = "FAQ #{$post_id}: {$faq['title_th']}";
        }
    }

    return $created;
}

/**
 * Generate Demo Videos
 */
function sakwood_generate_demo_videos() {
    $videos = array(
        array(
            'title_th' => 'วิธีวัดขนาดไม้กรอง',
            'title_en' => 'How to Measure Plywood',
            'url' => 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            'duration' => '5:30',
            'category' => 'product-tutorial',
            'description_th' => 'สอนวิธีวัดขนาดไม้กรองที่ถูกต้อง เพื่อให้ได้ขนาดตามต้องการ',
            'description_en' => 'Learn how to properly measure plywood to get the right dimensions.',
            'position' => 1
        ),
        array(
            'title_th' => 'งานเปิดตัวโรงงานใหม่ 2025',
            'title_en' => 'New Factory Opening 2025',
            'url' => 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            'duration' => '3:45',
            'category' => 'company-news',
            'description_th' => 'ภาพบรรยากาศงานเปิดตัวโรงงานผลิตไม้ซุงแห่งใหม่',
            'description_en' => 'Highlights from our new pine wood factory opening ceremony.',
            'position' => 2
        ),
        array(
            'title_th' => 'วิธีติดตั้งไม้พื้น',
            'title_en' => 'Flooring Installation Guide',
            'url' => 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            'duration' => '8:15',
            'category' => 'installation-guide',
            'description_th' => 'ขั้นตอนการติดตั้งไม้พื้นสำเร็จรูป',
            'description_en' => 'Step-by-step guide to installing engineered wood flooring.',
            'position' => 3
        ),
        array(
            'title_th' => 'รีวิวจากลูกค้า บริษัท ก่อสร้าง ABC',
            'title_en' => 'Customer Review: ABC Construction',
            'url' => 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            'duration' => '4:20',
            'category' => 'customer-story',
            'description_th' => 'เจ้าของบริษัทก่อสร้าง ABC เล่าประสบการณ์ใช้ไม้จาก SAK WoodWorks',
            'description_en' => 'ABC Construction owner shares experience with SAK WoodWorks lumber.',
            'position' => 4
        ),
    );

    $created = array();
    foreach ($videos as $video) {
        $post_id = wp_insert_post(array(
            'post_title' => $video['title_th'],
            'post_content' => $video['description_th'],
            'post_type' => 'video_gallery',
            'post_status' => 'publish',
        ));

        if ($post_id && !is_wp_error($post_id)) {
            // Extract video ID and type
            $video_id = '';
            $video_type = 'youtube';

            if (strpos($video['url'], 'youtube.com') !== false || strpos($video['url'], 'youtu.be') !== false) {
                preg_match('/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i', $video['url'], $matches);
                $video_id = isset($matches[1]) ? $matches[1] : '';
                $video_type = 'youtube';
            } elseif (strpos($video['url'], 'vimeo.com') !== false) {
                preg_match('/vimeo\.com\/(\d+)/', $video['url'], $matches);
                $video_id = isset($matches[1]) ? $matches[1] : '';
                $video_type = 'vimeo';
            }

            // Save video metadata
            update_post_meta($post_id, '_video_url', $video['url']);
            update_post_meta($post_id, '_video_type', $video_type);
            update_post_meta($post_id, '_video_id', $video_id);
            update_post_meta($post_id, '_video_duration', $video['duration']);
            update_post_meta($post_id, '_video_category', $video['category']);
            update_post_meta($post_id, '_video_position', $video['position']);
            update_post_meta($post_id, '_video_title_en', $video['title_en']);
            update_post_meta($post_id, '_video_description_en', $video['description_en']);

            $created[] = "Video #{$post_id}: {$video['title_th']}";
        }
    }

    return $created;
}

/**
 * Generate Demo Knowledge Base Articles
 */
function sakwood_generate_demo_knowledge() {
    $articles = array(
        array(
            'title_th' => 'เริ่มต้นใช้งานระบบสมาชิก',
            'title_en' => 'Getting Started with Member Account',
            'content_th' => '<h2>การสร้างบัญชีสมาชิก</h2><p>สร้างบัญชีสมาชิกเพื่อติดตามออเดอร์และรับส่วนลด</p><h2>การเพิ่มที่อยู่จัดส่ง</h2><p>เพิ่มที่อยู่หลายแห่งเพื่อความสะดวกในการจัดส่ง</p><h2>การสั่งซื้อสินค้า</h2><p>เลือกสินค้าและยืนยันออเดอร์ผ่านระบบ</p>',
            'content_en' => '<h2>Creating Your Account</h2><p>Create a member account to track orders and get discounts.</p><h2>Adding Shipping Addresses</h2><p>Add multiple addresses for convenient delivery.</p><h2>Placing Orders</h2><p>Select products and confirm orders through the system.</p>',
            'difficulty' => 'beginner',
            'category' => 'getting-started',
            'order' => 1,
            'featured' => 1,
            'views' => 1250
        ),
        array(
            'title_th' => 'ไม้กรองเกรดต่างๆ',
            'title_en' => 'Plywood Grades Explained',
            'content_th' => '<h2>เกรด AA</h2><p>ผิวด้านหน้าสวยเรียบ ไม่มีตาไม้</p><h2>เกรด A</h2><p>ผิวด้านหน้าดี มีตาไม้เล็กน้อย</p><h2>เกรด B</h2><p>ผิวด้านหน้าปกติ มีตาไม้กระจาย</p><h2>เกรด C</h2><p>ผิวด้านหน้าขัดเกลา ใช้เฉพาะด้านที่ไม่เห็น</p>',
            'content_en' => '<h2>Grade AA</h2><p>Smooth surface, no defects</p><h2>Grade A</h2><p>Good surface, minor defects</p><h2>Grade B</h2><p>Standard surface, scattered defects</p><h2>Grade C</h2><p>Rough surface, hidden sides only</p>',
            'difficulty' => 'intermediate',
            'category' => 'products',
            'order' => 1,
            'featured' => 1,
            'views' => 890
        ),
        array(
            'title_th' => 'การคำนวณปริมาณไม้ที่ต้องการ',
            'title_en' => 'Calculating Lumber Quantity',
            'content_th' => '<h2>วิธีคำนวณ</h2><p>ความยาว x ความกว้าง x ความหนา = ปริมาตร</p><h2>หน่วยวัด</h2><p>ไม้กรองวัดเป็นตารางฟุต ไม้ซุงวัดเป็นบอร์ดฟุต</p><h2>ตัวอย่าง</h2><p>ไม้กรอง 4x8 ฟุต จำนวน 10 แผ่น = 26.67 ตารางฟุต</p>',
            'content_en' => '<h2>Calculation Method</h2><p>Length x Width x Thickness = Volume</p><h2>Measurement Units</h2><p>Plywood in square feet, lumber in board feet</p><h2>Example</h2><p>4x8 plywood, 10 sheets = 26.67 sq ft</p>',
            'difficulty' => 'intermediate',
            'category' => 'products',
            'order' => 2,
            'featured' => 0,
            'views' => 567
        ),
        array(
            'title_th' => 'โซนการจัดส่งและอัตราค่าขนส่ง',
            'title_en' => 'Delivery Zones and Rates',
            'content_th' => '<h2>โซน 1: กรุงเทพฯ และปริมณฑล</h2><p>ส่งภายใน 1-2 วัน ค่าขนส่ง 5,000-6,500 บาท</p><h2>โซน 2: ภาคกลาง</h2><p>ส่งภายใน 2-3 วัน ค่าขนส่ง 2,000-3,000 บาท</p><h2>โซน 3: ภาคเหนือ</h2><p>ส่งภายใน 3-5 วัน ค่าขนส่ง 3,000-10,000 บาท</p>',
            'content_en' => '<h2>Zone 1: Bangkok Metro</h2><p>1-2 days, 5,000-6,500 THB</p><h2>Zone 2: Central</h2><p>2-3 days, 2,000-3,000 THB</p><h2>Zone 3: Northern</h2><p>3-5 days, 3,000-10,000 THB</p>',
            'difficulty' => 'beginner',
            'category' => 'shipping',
            'order' => 1,
            'featured' => 1,
            'views' => 2100
        ),
        array(
            'title_th' => 'ปัญหาไม้บิดเบี้ยวและวิธีป้องกัน',
            'title_en' => 'Wood Warping Prevention',
            'content_th' => '<h2>สาเหตุของการบิดเบี้ยว</h2><p>ความชื้นไม่สม่ำเสมอ การเปลี่ยนอุณหภูมิ</p><h2>การเก็บรักษาที่ถูกต้อง</h2><p>เก็บในที่แห้ง มีอากาศถ่ายเทดี</p><h2>การติดตั้งที่ถูกต้อง</h2><p>ใช้ตัวยึดที่เหมาะสม เจาะรูระยะห่างถูกต้อง</p>',
            'content_en' => '<h2>Causes of Warping</h2><p>Uneven moisture, temperature changes</p><h2>Proper Storage</h2><p>Store in dry, ventilated areas</p><h2>Proper Installation</h2><p>Use correct fasteners, proper spacing</p>',
            'difficulty' => 'advanced',
            'category' => 'products',
            'order' => 3,
            'featured' => 0,
            'views' => 423
        ),
    );

    $created = array();
    foreach ($articles as $article) {
        $post_id = wp_insert_post(array(
            'post_title' => $article['title_th'],
            'post_content' => $article['content_th'],
            'post_type' => 'knowledge_base',
            'post_status' => 'publish',
        ));

        if ($post_id && !is_wp_error($post_id)) {
            // Add metadata
            update_post_meta($post_id, '_kb_order', $article['order']);
            update_post_meta($post_id, '_kb_difficulty', $article['difficulty']);
            update_post_meta($post_id, '_kb_featured', $article['featured']);
            update_post_meta($post_id, '_kb_views_count', $article['views']);
            update_post_meta($post_id, '_kb_last_updated', current_time('Y-m-d'));
            update_post_meta($post_id, '_kb_title_en', $article['title_en']);
            update_post_meta($post_id, '_kb_content_en', $article['content_en']);

            // Set category
            wp_set_object_terms($post_id, $article['category'], 'kb_category');

            $created[] = "Article #{$post_id}: {$article['title_th']}";
        }
    }

    return $created;
}

/**
 * Generate Demo CRM Data
 */
function sakwood_generate_demo_crm() {
    global $wpdb;

    // Get first user (likely admin)
    $user = get_users(array('number' => 1, 'role' => 'administrator'));
    $user_id = $user[0]->ID ?? 1;

    // Create customer record
    $customer_table = $wpdb->prefix . 'sakwood_customers';
    $customer_exists = $wpdb->get_var($wpdb->prepare(
        "SELECT id FROM $customer_table WHERE wp_user_id = %d",
        $user_id
    ));

    if (!$customer_exists) {
        $wpdb->insert(
            $customer_table,
            array(
                'wp_user_id' => $user_id,
                'customer_type' => 'vip',
                'phone' => '081-234-5678',
                'line_id' => 'sakwood_demo',
                'company' => 'SAK Demo Company',
                'tax_id' => '1234567890123',
                'total_orders' => 15,
                'total_spent' => '250000.00',
                'avg_order_value' => '16666.67',
                'member_since' => '2024-01-01',
                'last_order_date' => current_time('Y-m-d'),
            ),
            array('%d', '%s', '%s', '%s', '%s', '%s', '%d', '%s', '%s', '%s', '%s')
        );
        $customer_id = $wpdb->insert_id;
    } else {
        $customer_id = $customer_exists;
    }

    // Create interactions
    $interactions_table = $wpdb->prefix . 'sakwood_interactions';
    $demo_interactions = array(
        array(
            'customer_id' => $customer_id,
            'interaction_type' => 'call',
            'direction' => 'inbound',
            'subject' => 'สอบถามสถานะออเดอร์ #1234',
            'message' => 'ลูกค้าโทรมาสอบถามสถานะออเดอร์ ยืนยันว่าจะส่งวันพรุ่งนี้',
            'interaction_date' => date('Y-m-d H:i:s', strtotime('-1 day')),
            'created_by' => 'Admin User',
        ),
        array(
            'customer_id' => $customer_id,
            'interaction_type' => 'email',
            'direction' => 'outbound',
            'subject' => 'ส่งใบเสนอราคาไม้กรอง',
            'message' => 'ส่งใบเสนอราคาไม้กรองเกรด AA จำนวน 50 แผ่น รอการยืนยัน',
            'interaction_date' => date('Y-m-d H:i:s', strtotime('-2 days')),
            'created_by' => 'Sales Team',
        ),
        array(
            'customer_id' => $customer_id,
            'interaction_type' => 'line',
            'direction' => 'inbound',
            'subject' => 'สอบถามส่วนลดจำนวนมาก',
            'message' => 'ลูกค้าสนใจสั่งซื้อจำนวนมาก สอบถามส่วนลดเพิ่มเติม',
            'interaction_date' => date('Y-m-d H:i:s', strtotime('-3 days')),
            'created_by' => 'Admin User',
        ),
        array(
            'customer_id' => $customer_id,
            'interaction_type' => 'visit',
            'direction' => 'inbound',
            'subject' => 'เยี่ยมโรงงาน',
            'message' => 'ลูกค้ามาเยี่ยมโรงงานพร้อมทีมงานวิศวกร ดูคุณภาพไม้',
            'interaction_date' => date('Y-m-d H:i:s', strtotime('-1 week')),
            'created_by' => 'Admin User',
        ),
    );

    $created_interactions = array();
    foreach ($demo_interactions as $interaction) {
        $result = $wpdb->insert($interactions_table, $interaction);
        if ($result) {
            $created_interactions[] = "Interaction #{$wpdb->insert_id}: {$interaction['subject']}";
        }
    }

    // Create tasks
    $tasks_table = $wpdb->prefix . 'sakwood_tasks';
    $demo_tasks = array(
        array(
            'customer_id' => $customer_id,
            'title' => 'ติดตามการชำระเงินออเดอร์ #1235',
            'description' => 'โทรติดตามการโอนเงิน ออเดอร์ยังไม่ได้รับการชำระ',
            'task_type' => 'payment_reminder',
            'priority' => 'high',
            'status' => 'pending',
            'due_date' => date('Y-m-d', strtotime('+2 days')),
            'created_at' => current_time('Y-m-d H:i:s'),
        ),
        array(
            'customer_id' => $customer_id,
            'title' => 'ส่งใบเสนอราคาใหม่',
            'description' => 'ลูกค้าสนใจไม้ซุงเกรด AAA ส่งราคาใหม่พร้อมส่วนลด',
            'task_type' => 'send_quote',
            'priority' => 'medium',
            'status' => 'in_progress',
            'due_date' => date('Y-m-d', strtotime('+5 days')),
            'created_at' => current_time('Y-m-d H:i:s'),
        ),
        array(
            'customer_id' => $customer_id,
            'title' => 'ติดตามความพึงพอใจหลังการซื้อ',
            'description' => 'โทรสอบถามความพึงพอใจหลังจัดส่งครั้งล่าสุด',
            'task_type' => 'follow_up',
            'priority' => 'low',
            'status' => 'pending',
            'due_date' => date('Y-m-d', strtotime('+7 days')),
            'created_at' => current_time('Y-m-d H:i:s'),
        ),
        array(
            'customer_id' => $customer_id,
            'title' => 'ยืนยันการสั่งซื้อไม้กรอง',
            'description' => 'ลูกค้ายืนยันออเดอร์แล้ว จัดทำใบสั่งขาย',
            'task_type' => 'order_confirmation',
            'priority' => 'high',
            'status' => 'completed',
            'due_date' => date('Y-m-d', strtotime('-3 days')),
            'created_at' => current_time('Y-m-d H:i:s'),
        ),
        array(
            'customer_id' => $customer_id,
            'title' => 'แจ้งอัปเดตการจัดส่ง',
            'description' => 'แจ้งลูกค้าว่าสินค้าถูกจัดส่งแล้ววันนี้',
            'task_type' => 'shipping_update',
            'priority' => 'medium',
            'status' => 'completed',
            'due_date' => date('Y-m-d', strtotime('-1 day')),
            'created_at' => current_time('Y-m-d H:i:s'),
        ),
    );

    $created_tasks = array();
    foreach ($demo_tasks as $task) {
        $result = $wpdb->insert($tasks_table, $task);
        if ($result) {
            $created_tasks[] = "Task #{$wpdb->insert_id}: {$task['title']}";
        }
    }

    return array(
        'customer' => "Customer #{$customer_id} created/updated for user #{$user_id}",
        'interactions' => $created_interactions,
        'tasks' => $created_tasks,
    );
}
