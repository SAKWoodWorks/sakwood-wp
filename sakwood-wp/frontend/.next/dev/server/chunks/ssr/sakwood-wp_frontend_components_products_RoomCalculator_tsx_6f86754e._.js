module.exports = [
"[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RoomCalculator",
    ()=>RoomCalculator
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sakwood-wp/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sakwood-wp/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calculator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Calculator$3e$__ = __turbopack_context__.i("[project]/sakwood-wp/frontend/node_modules/lucide-react/dist/esm/icons/calculator.js [app-ssr] (ecmascript) <export default as Calculator>");
var __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$house$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Home$3e$__ = __turbopack_context__.i("[project]/sakwood-wp/frontend/node_modules/lucide-react/dist/esm/icons/house.js [app-ssr] (ecmascript) <export default as Home>");
var __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Layers$3e$__ = __turbopack_context__.i("[project]/sakwood-wp/frontend/node_modules/lucide-react/dist/esm/icons/layers.js [app-ssr] (ecmascript) <export default as Layers>");
var __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lamp$2d$ceiling$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__LampCeiling$3e$__ = __turbopack_context__.i("[project]/sakwood-wp/frontend/node_modules/lucide-react/dist/esm/icons/lamp-ceiling.js [app-ssr] (ecmascript) <export default as LampCeiling>");
var __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__ = __turbopack_context__.i("[project]/sakwood-wp/frontend/node_modules/lucide-react/dist/esm/icons/info.js [app-ssr] (ecmascript) <export default as Info>");
var __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__ = __turbopack_context__.i("[project]/sakwood-wp/frontend/node_modules/lucide-react/dist/esm/icons/circle-alert.js [app-ssr] (ecmascript) <export default as AlertCircle>");
'use client';
;
;
;
// Standard product sizes (thickness in cm, width in cm, length in cm)
const STANDARD_PRODUCTS = {
    floor: [
        {
            id: 'floor-1',
            name: 'ไม้พื้น 1.2x12x240cm',
            thickness: 1.2,
            width: 12,
            length: 240
        },
        {
            id: 'floor-2',
            name: 'ไม้พื้น 1.5x15x300cm',
            thickness: 1.5,
            width: 15,
            length: 300
        },
        {
            id: 'floor-3',
            name: 'ไม้พื้น 1.8x18x360cm',
            thickness: 1.8,
            width: 18,
            length: 360
        }
    ],
    siding: [
        {
            id: 'siding-1',
            name: 'ไม้ฝา 1.2x12x240cm',
            thickness: 1.2,
            width: 12,
            length: 240
        },
        {
            id: 'siding-2',
            name: 'ไม้ฝา 1.5x15x300cm',
            thickness: 1.5,
            width: 15,
            length: 300
        }
    ],
    ceiling: [
        {
            id: 'ceiling-1',
            name: 'ไม้ฝ้า 1.2x12x240cm',
            thickness: 1.2,
            width: 12,
            length: 240
        },
        {
            id: 'ceiling-2',
            name: 'ไม้ฝ้า 1.5x15x300cm',
            thickness: 1.5,
            width: 15,
            length: 300
        }
    ]
};
function RoomCalculator({ lang = 'th', dictionary, products = [] }) {
    const [projectType, setProjectType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('floor');
    const [roomWidth, setRoomWidth] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [roomLength, setRoomLength] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [roomHeight, setRoomHeight] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [wastePercentage, setWastePercentage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('10');
    const [gapBetweenPieces, setGapBetweenPieces] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('0.2'); // Default 2mm in cm
    const [selectedProduct, setSelectedProduct] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [results, setResults] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [showInstructions, setShowInstructions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    // Convert Product[] to WoodProduct[] (API returns thickness/width in cm, length in m)
    const convertedProducts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        return products.filter((p)=>{
            const thickness = typeof p.thickness === 'string' ? parseFloat(p.thickness) : p.thickness ?? 0;
            const width = typeof p.width === 'string' ? parseFloat(p.width) : p.width ?? 0;
            const length = typeof p.length === 'string' ? parseFloat(p.length) : p.length ?? 0;
            return width > 0 && length > 0 && thickness > 0; // Only include products with valid dimensions
        }).map((p)=>({
                id: p.id,
                name: p.name,
                thickness: typeof p.thickness === 'string' ? parseFloat(p.thickness) : p.thickness ?? 0,
                width: typeof p.width === 'string' ? parseFloat(p.width) : p.width ?? 0,
                length: Math.round((typeof p.length === 'string' ? parseFloat(p.length) : p.length ?? 0) * 100),
                price: p.price,
                categories: p.categories?.map((c)=>({
                        slug: c.slug,
                        name: c.name
                    }))
            }));
    }, [
        products
    ]);
    const dict = dictionary?.room_calculator || {
        title: lang === 'th' ? 'เครื่องคำนวณห้อง' : 'Room Calculator',
        subtitle: lang === 'th' ? 'คำนวณปริมาณไม้ที่ต้องการสำหรับโปรเจกต์ของคุณ' : 'Calculate the amount of wood needed for your project',
        project_type: lang === 'th' ? 'ประเภทโปรเจกต์' : 'Project Type',
        select_project: lang === 'th' ? 'เลือกประเภทโปรเจกต์' : 'Select Project Type',
        floor: lang === 'th' ? 'ไม้พื้น' : 'Floor',
        siding: lang === 'th' ? 'ไม้ฝา' : 'Siding',
        ceiling: lang === 'th' ? 'ไม้ฝ้า' : 'Ceiling',
        room_dimensions: lang === 'th' ? 'ขนาดห้อง' : 'Room Dimensions',
        width_m: lang === 'th' ? 'ความกว้าง (เมตร)' : 'Width (meters)',
        length_m: lang === 'th' ? 'ความยาว (เมตร)' : 'Length (meters)',
        height_m: lang === 'th' ? 'ความสูง (เมตร)' : 'Height (meters)',
        calculate: lang === 'th' ? 'คำนวณ' : 'Calculate',
        clear: lang === 'th' ? 'ล้างค่า' : 'Clear',
        results: lang === 'th' ? 'ผลการคำนวณ' : 'Results',
        total_area: lang === 'th' ? 'พื้นที่รวม' : 'Total Area',
        sqm: lang === 'th' ? 'ตร.ม.' : 'm²',
        pieces_needed: lang === 'th' ? 'จำนวนแผ่นที่ต้องการ' : 'Pieces Needed',
        piece: lang === 'th' ? 'แผ่น' : 'pieces',
        waste_factor: lang === 'th' ? 'ค่าของเสีย' : 'Waste Factor',
        include_waste: lang === 'th' ? 'รวมค่าของเสีย' : 'Include waste',
        waste_percentage: lang === 'th' ? 'เผื่อค่าของเสีย (%)' : 'Waste allowance (%)',
        product_recommendations: lang === 'th' ? 'สินค้าแนะนำ' : 'Recommended Products',
        recommended_product: lang === 'th' ? 'สินค้าที่แนะนำ' : 'Recommended Product',
        coverage_per_piece: lang === 'th' ? 'ครอบคลุมต่อแผ่น' : 'Coverage per piece',
        total_with_waste: lang === 'th' ? 'รวมค่าของเสีย' : 'Total with waste',
        waste_amount: lang === 'th' ? 'ค่าของเสีย' : 'Waste amount',
        tips_title: lang === 'th' ? 'คำแนะนำ' : 'Tips',
        tip1: lang === 'th' ? 'วัดห้องอย่างละเอียดเพื่อความแม่นยำ' : 'Measure room carefully for accuracy',
        tip2: lang === 'th' ? 'ควรเผื่อนพื้นที่เพิ่มสำหรับบริเวณที่ไม่สมมากัน' : 'Add extra area for uneven surfaces',
        tip3: lang === 'th' ? 'สำหรับฝ้า ควรพิจารณ์ความสูงด้วย' : 'Consider ceiling height for siding',
        tip4: lang === 'th' ? 'ติดต่อผู้ขายเพื่อขอราคาจำนวณเพิ่มเติม' : 'Contact supplier for detailed quote',
        no_products: lang === 'th' ? 'ไม่มีสินค้า' : 'No products available',
        estimated_cost: lang === 'th' ? 'ราคาประเมิน' : 'Estimated Cost',
        cost_per_piece: lang === 'th' ? 'ราคาต่อแผ่น' : 'Cost per piece',
        total_cost: lang === 'th' ? 'รวมทั้งหมด' : 'Total Cost',
        price_not_available: lang === 'th' ? 'ไม่มีราคา' : 'Price not available',
        contact_for_quote: lang === 'th' ? 'ติดต่อเราเพื่อขอราคา' : 'Contact us for a quote',
        thb: lang === 'th' ? '฿' : 'THB',
        select_product: lang === 'th' ? 'เลือกสินค้า' : 'Select Product',
        all_products: lang === 'th' ? 'สินค้าทั้งหมด' : 'All Products',
        recommended_for: lang === 'th' ? 'แนะนำสำหรับ' : 'Recommended for',
        gap_between_pieces: lang === 'th' ? 'ร่องระหว่างแผ่น (ซม.)' : 'Gap Between Pieces (cm)',
        gap_description: lang === 'th' ? 'ระยะห่างระหว่างแผ่นไม้ (เช่น 0.2 ซม. = 2 มม.)' : 'Distance between wood pieces (e.g. 0.2cm = 2mm)',
        with_gap: lang === 'th' ? 'รวมร่องห่าง' : 'With gap',
        effective_width: lang === 'th' ? 'ความกว้างรวมร่อง' : 'Effective width'
    };
    // Category slug to project type mapping
    const categoryMapping = {
        floor: [
            'floor',
            'flooring',
            'ไม้พื้น',
            'wood-floor'
        ],
        siding: [
            'siding',
            'wall',
            'ไม้ฝา',
            'wood-siding'
        ],
        ceiling: [
            'ceiling',
            'ไม้ฝ้า',
            'wood-ceiling'
        ]
    };
    // Filter products by category for recommendations
    const recommendedProducts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (convertedProducts.length === 0) return [];
        const categorySlugs = categoryMapping[projectType] || [];
        return convertedProducts.filter((product)=>{
            if (!product.categories || product.categories.length === 0) return false;
            return product.categories.some((cat)=>categorySlugs.some((slug)=>cat.slug.includes(slug)));
        });
    }, [
        convertedProducts,
        projectType
    ]);
    const allProducts = convertedProducts.length > 0 ? convertedProducts : STANDARD_PRODUCTS[projectType];
    const defaultProduct = allProducts[0];
    const calculate = ()=>{
        const width = parseFloat(roomWidth);
        const length = parseFloat(roomLength);
        const height = parseFloat(roomHeight);
        const product = selectedProduct || defaultProduct;
        const gap = parseFloat(gapBetweenPieces) || 0;
        if (isNaN(width) || isNaN(length) || width <= 0 || length <= 0) {
            alert(lang === 'th' ? 'กรุณากรอกขนาดห้องที่ถูกต้อง' : 'Please enter valid room dimensions');
            return;
        }
        // Calculate total area based on project type
        let totalArea = 0;
        if (projectType === 'floor') {
            // Floor: width x length
            totalArea = width * length;
        } else if (projectType === 'ceiling') {
            // Ceiling: width x length
            totalArea = width * length;
        } else if (projectType === 'siding') {
            // Siding: (width + width + length + length) x height (perimeter x height)
            if (isNaN(height) || height <= 0) {
                alert(lang === 'th' ? 'กรุณากรอกความสูงสำหรับไม้ฝา' : 'Please enter ceiling height for siding');
                return;
            }
            totalArea = (width + width + length + length) * height;
        }
        // Calculate effective width with gap (in cm)
        const effectiveWidth = product.width + gap;
        // Calculate pieces needed considering the gap
        // For floor/ceiling: calculate based on width with gap
        // For siding: calculate based on width with gap
        let piecesNeeded = 0;
        if (projectType === 'floor' || projectType === 'ceiling') {
            // Calculate how many pieces fit across the width (with gap)
            const roomWidthCm = width * 100; // Convert to cm
            const piecesPerRow = Math.ceil(roomWidthCm / effectiveWidth);
            // Calculate how many rows needed
            const pieceLengthCm = product.length / 100; // Already in meters
            const numberOfRows = Math.ceil(length / pieceLengthCm);
            piecesNeeded = piecesPerRow * numberOfRows;
        } else if (projectType === 'siding') {
            // For siding, calculate based on perimeter and height
            const perimeterCm = (width + width + length + length) * 100;
            const piecesPerRow = Math.ceil(perimeterCm / effectiveWidth);
            const numberOfRows = Math.ceil(height); // height is in meters, piece length is in meters
            piecesNeeded = piecesPerRow * numberOfRows;
        }
        // Add waste factor based on user input
        const wastePercent = parseFloat(wastePercentage) || 0;
        const wasteMultiplier = 1 + wastePercent / 100;
        const areaWithWaste = totalArea * wasteMultiplier;
        const wasteAmount = areaWithWaste - totalArea;
        piecesNeeded = Math.ceil(piecesNeeded * wasteMultiplier);
        // Calculate estimated cost if product has price
        let estimatedCost = undefined;
        let costPerPiece = undefined;
        if (product.price) {
            // Parse price (e.g., "1,200.00฿" or "1200" or "1200.00")
            const priceValue = parseFloat(product.price.replace(/[^\d.]/g, ''));
            if (!isNaN(priceValue)) {
                costPerPiece = priceValue;
                estimatedCost = priceValue * piecesNeeded;
            }
        }
        setResults({
            totalArea,
            piecesNeeded,
            areaWithWaste,
            wasteAmount,
            estimatedCost,
            costPerPiece,
            gapBetweenPieces: gap
        });
    };
    const clear = ()=>{
        setRoomWidth('');
        setRoomLength('');
        setRoomHeight('');
        setWastePercentage('10');
        setGapBetweenPieces('0.2');
        setSelectedProduct(null);
        setResults(null);
    };
    const getProjectIcon = (type)=>{
        switch(type){
            case 'floor':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$house$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Home$3e$__["Home"], {
                    className: "w-5 h-5"
                }, void 0, false, {
                    fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                    lineNumber: 257,
                    columnNumber: 16
                }, this);
            case 'siding':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Layers$3e$__["Layers"], {
                    className: "w-5 h-5"
                }, void 0, false, {
                    fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                    lineNumber: 259,
                    columnNumber: 16
                }, this);
            case 'ceiling':
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lamp$2d$ceiling$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__LampCeiling$3e$__["LampCeiling"], {
                    className: "w-5 h-5"
                }, void 0, false, {
                    fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                    lineNumber: 261,
                    columnNumber: 16
                }, this);
            default:
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calculator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Calculator$3e$__["Calculator"], {
                    className: "w-5 h-5"
                }, void 0, false, {
                    fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                    lineNumber: 263,
                    columnNumber: 16
                }, this);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg border border-green-100",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col sm:flex-row items-start gap-3 sm:gap-4 mb-4 sm:mb-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-2 sm:p-3 bg-green-600 rounded-lg",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calculator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Calculator$3e$__["Calculator"], {
                            className: "w-5 h-5 sm:w-6 sm:h-6 text-white"
                        }, void 0, false, {
                            fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                            lineNumber: 272,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                        lineNumber: 271,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 w-full",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-xl sm:text-2xl font-bold text-gray-900 mb-1",
                                children: dict.title
                            }, void 0, false, {
                                fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                                lineNumber: 275,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm sm:text-base text-gray-600",
                                children: dict.subtitle
                            }, void 0, false, {
                                fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                                lineNumber: 276,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                        lineNumber: 274,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setShowInstructions(!showInstructions),
                        className: "px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-green-700 bg-green-100 hover:bg-green-200 rounded-lg transition-colors w-full sm:w-auto",
                        children: showInstructions ? lang === 'th' ? 'ซ่อนวิธีใช้' : 'Hide Instructions' : lang === 'th' ? 'แสดงวิธีใช้' : 'Show Instructions'
                    }, void 0, false, {
                        fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                        lineNumber: 278,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                lineNumber: 270,
                columnNumber: 7
            }, this),
            showInstructions && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-4 sm:mb-6 p-3 sm:p-4 lg:p-6 bg-white rounded-xl border-2 border-blue-200 shadow-sm",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                        className: "text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__["Info"], {
                                className: "w-4 h-4 sm:w-5 sm:h-5 text-blue-600"
                            }, void 0, false, {
                                fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                                lineNumber: 290,
                                columnNumber: 13
                            }, this),
                            lang === 'th' ? 'วิธีการคำนวณ' : 'How to Calculate'
                        ]
                    }, void 0, true, {
                        fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                        lineNumber: 289,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-4 sm:mb-6 p-3 sm:p-4 bg-blue-50 rounded-lg border border-blue-200",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h5", {
                                className: "font-semibold text-blue-900 mb-2 sm:mb-3 text-sm sm:text-base",
                                children: lang === 'th' ? 'สูตรคำนวณ' : 'Calculation Formula'
                            }, void 0, false, {
                                fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                                lineNumber: 296,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-xs sm:text-sm text-gray-700 space-y-2",
                                children: [
                                    projectType === 'floor' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-2 mb-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-bold text-green-700 text-sm sm:text-base",
                                                        children: [
                                                            dict.floor,
                                                            ":"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                                                        lineNumber: 303,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "bg-white px-2 sm:px-3 py-1 rounded border border-gray-300 text-xs sm:text-sm",
                                                        children: [
                                                            dict.width_m,
                                                            " × ",
                                                            dict.length_m,
                                                            " = ",
                                                            dict.total_area
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                                                        lineNumber: 304,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                                                lineNumber: 302,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-xs text-gray-600",
                                                children: lang === 'th' ? 'ตัวอย่าง: ห้องกว้าง 3 เมตร × ยาว 4 เมตร = 12 ตร.ม.' : 'Example: 3m × 4m room = 12 m²'
                                            }, void 0, false, {
                                                fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                                                lineNumber: 308,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true),
                                    projectType === 'ceiling' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-2 mb-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-bold text-green-700 text-sm sm:text-base",
                                                        children: [
                                                            dict.ceiling,
                                                            ":"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                                                        lineNumber: 316,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "bg-white px-2 sm:px-3 py-1 rounded border border-gray-300 text-xs sm:text-sm",
                                                        children: [
                                                            dict.width_m,
                                                            " × ",
                                                            dict.length_m,
                                                            " = ",
                                                            dict.total_area
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                                                        lineNumber: 317,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                                                lineNumber: 315,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-xs text-gray-600",
                                                children: lang === 'th' ? 'ตัวอย่าง: เพดานกว้าง 3 เมตร × ยาว 4 เมตร = 12 ตร.ม.' : 'Example: 3m × 4m ceiling = 12 m²'
                                            }, void 0, false, {
                                                fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                                                lineNumber: 321,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true),
                                    projectType === 'siding' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-2 mb-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-bold text-green-700 text-sm sm:text-base",
                                                        children: [
                                                            dict.siding,
                                                            ":"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                                                        lineNumber: 329,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "bg-white px-2 sm:px-3 py-1 rounded border border-gray-300 text-xs sm:text-sm break-all",
                                                        children: [
                                                            "(",
                                                            dict.width_m,
                                                            " + ",
                                                            dict.width_m,
                                                            " + ",
                                                            dict.length_m,
                                                            " + ",
                                                            dict.length_m,
                                                            ") × ",
                                                            dict.height_m,
                                                            " = ",
                                                            dict.total_area
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                                                        lineNumber: 330,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                                                lineNumber: 328,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-xs text-gray-600",
                                                children: lang === 'th' ? 'ตัวอย่าง: (3 + 3 + 4 + 4) × 2.5 = 35 ตร.ม.' : 'Example: (3 + 3 + 4 + 4) × 2.5 = 35 m²'
                                            }, void 0, false, {
                                                fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                                                lineNumber: 334,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                                lineNumber: 299,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                        lineNumber: 295,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ol", {
                        className: "space-y-2 sm:space-y-3 text-xs sm:text-sm text-gray-700",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                className: "flex gap-2 sm:gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-bold",
                                        children: "1"
                                    }, void 0, false, {
                                        fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                                        lineNumber: 344,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs sm:text-sm",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                children: [
                                                    dict.select_project,
                                                    ":"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                                                lineNumber: 346,
                                                columnNumber: 17
                                            }, this),
                                            " ",
                                            lang === 'th' ? 'เลือกไม้พื้น, ไม้ฝา, หรือไม้ฝ้า' : 'Choose Floor, Siding, or Ceiling'
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                                        lineNumber: 345,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                                lineNumber: 343,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                className: "flex gap-2 sm:gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-bold",
                                        children: "2"
                                    }, void 0, false, {
                                        fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                                        lineNumber: 350,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs sm:text-sm",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                children: [
                                                    dict.room_dimensions,
                                                    ":"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                                                lineNumber: 352,
                                                columnNumber: 17
                                            }, this),
                                            " ",
                                            lang === 'th' ? 'กรอกความกว้างและความยาวของห้อง (เมตร)' : 'Enter room width and length (meters)',
                                            projectType === 'siding' && ` + ${dict.height_m}`
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                                        lineNumber: 351,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                                lineNumber: 349,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                className: "flex gap-2 sm:gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-bold",
                                        children: "3"
                                    }, void 0, false, {
                                        fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                                        lineNumber: 357,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs sm:text-sm",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                children: [
                                                    dict.product_recommendations,
                                                    ":"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                                                lineNumber: 359,
                                                columnNumber: 17
                                            }, this),
                                            " ",
                                            lang === 'th' ? 'เลือกขนาดไม้ที่ต้องการใช้งาน' : 'Select the wood size you want to use'
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                                        lineNumber: 358,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                                lineNumber: 356,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                className: "flex gap-2 sm:gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-bold",
                                        children: "4"
                                    }, void 0, false, {
                                        fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                                        lineNumber: 363,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs sm:text-sm",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                children: [
                                                    dict.calculate,
                                                    ":"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                                                lineNumber: 365,
                                                columnNumber: 17
                                            }, this),
                                            " ",
                                            lang === 'th' ? 'คลิกปุ่มคำนวณเพื่อดูผลลัพธ์' : 'Click Calculate button to see results'
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                                        lineNumber: 364,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                                lineNumber: 362,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                        lineNumber: 342,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                lineNumber: 288,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-4 sm:mb-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-700 mb-2 sm:mb-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calculator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Calculator$3e$__["Calculator"], {
                                className: "w-3 h-3 sm:w-4 sm:h-4"
                            }, void 0, false, {
                                fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                                lineNumber: 375,
                                columnNumber: 11
                            }, this),
                            dict.project_type
                        ]
                    }, void 0, true, {
                        fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                        lineNumber: 374,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4",
                        children: [
                            'floor',
                            'siding',
                            'ceiling'
                        ].map((type)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>{
                                    setProjectType(type);
                                    setSelectedProduct(null);
                                    setResults(null);
                                },
                                className: `p-3 sm:p-4 rounded-lg border-2 transition-all flex flex-row sm:flex-col items-center gap-2 ${projectType === type ? 'border-green-500 bg-green-50 text-green-700' : 'border-gray-200 hover:border-green-300 bg-white'}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "flex-shrink-0",
                                        children: getProjectIcon(type)
                                    }, void 0, false, {
                                        fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                                        lineNumber: 393,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-medium text-sm sm:text-base",
                                        children: dict[type]
                                    }, void 0, false, {
                                        fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                                        lineNumber: 394,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, type, true, {
                                fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                                lineNumber: 380,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                        lineNumber: 378,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                lineNumber: 373,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-4 sm:mb-6 p-3 sm:p-4 lg:p-6 bg-white rounded-xl border border-gray-200 shadow-sm",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                        className: "text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$house$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Home$3e$__["Home"], {
                                className: "w-4 h-4 sm:w-5 sm:h-5 text-green-600"
                            }, void 0, false, {
                                fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                                lineNumber: 403,
                                columnNumber: 11
                            }, this),
                            dict.room_dimensions
                        ]
                    }, void 0, true, {
                        fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                        lineNumber: 402,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 mb-4 sm:mb-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2",
                                        children: dict.width_m
                                    }, void 0, false, {
                                        fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                                        lineNumber: 410,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "number",
                                        value: roomWidth,
                                        onChange: (e)=>setRoomWidth(e.target.value),
                                        placeholder: "3",
                                        step: "0.1",
                                        min: "0",
                                        className: "w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    }, void 0, false, {
                                        fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                                        lineNumber: 413,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                                lineNumber: 409,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2",
                                        children: dict.length_m
                                    }, void 0, false, {
                                        fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                                        lineNumber: 426,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "number",
                                        value: roomLength,
                                        onChange: (e)=>setRoomLength(e.target.value),
                                        placeholder: "4",
                                        step: "0.1",
                                        min: "0",
                                        className: "w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    }, void 0, false, {
                                        fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                                        lineNumber: 429,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                                lineNumber: 425,
                                columnNumber: 11
                            }, this),
                            projectType === 'siding' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2",
                                        children: dict.height_m
                                    }, void 0, false, {
                                        fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                                        lineNumber: 443,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "number",
                                        value: roomHeight,
                                        onChange: (e)=>setRoomHeight(e.target.value),
                                        placeholder: "2.5",
                                        step: "0.1",
                                        min: "0",
                                        className: "w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    }, void 0, false, {
                                        fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                                        lineNumber: 446,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                                lineNumber: 442,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                        lineNumber: 407,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                htmlFor: "waste",
                                className: "block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2",
                                children: dict.waste_percentage
                            }, void 0, false, {
                                fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                                lineNumber: 461,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "number",
                                        id: "waste",
                                        value: wastePercentage,
                                        onChange: (e)=>setWastePercentage(e.target.value),
                                        placeholder: "10",
                                        step: "1",
                                        min: "0",
                                        max: "50",
                                        className: "w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    }, void 0, false, {
                                        fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                                        lineNumber: 465,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-sm sm:text-base text-gray-600 font-medium",
                                        children: "%"
                                    }, void 0, false, {
                                        fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                                        lineNumber: 476,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                                lineNumber: 464,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-gray-500 mt-1",
                                children: lang === 'th' ? 'แนะนำ 5-15%' : 'Recommended 5-15%'
                            }, void 0, false, {
                                fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                                lineNumber: 478,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                        lineNumber: 460,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                htmlFor: "gap",
                                className: "block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2",
                                children: dict.gap_between_pieces
                            }, void 0, false, {
                                fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                                lineNumber: 485,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "number",
                                        id: "gap",
                                        value: gapBetweenPieces,
                                        onChange: (e)=>setGapBetweenPieces(e.target.value),
                                        placeholder: "0.2",
                                        step: "0.1",
                                        min: "0",
                                        max: "2",
                                        className: "w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    }, void 0, false, {
                                        fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                                        lineNumber: 489,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-sm sm:text-base text-gray-600 font-medium",
                                        children: "cm"
                                    }, void 0, false, {
                                        fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                                        lineNumber: 500,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                                lineNumber: 488,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-gray-500 mt-1",
                                children: dict.gap_description
                            }, void 0, false, {
                                fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                                lineNumber: 502,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                        lineNumber: 484,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                lineNumber: 401,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-4 sm:mb-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-700 mb-2 sm:mb-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__["Info"], {
                                className: "w-3 h-3 sm:w-4 sm:h-4"
                            }, void 0, false, {
                                fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                                lineNumber: 511,
                                columnNumber: 11
                            }, this),
                            dict.product_recommendations
                        ]
                    }, void 0, true, {
                        fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                        lineNumber: 510,
                        columnNumber: 9
                    }, this),
                    allProducts.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-4 sm:p-6 bg-gray-100 rounded-lg text-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm sm:text-base text-gray-600 mb-2",
                                children: dict.no_products
                            }, void 0, false, {
                                fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                                lineNumber: 517,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs sm:text-sm text-gray-500",
                                children: "Make sure your products have dimensions (Thickness, Width, Length) set in WordPress admin."
                            }, void 0, false, {
                                fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                                lineNumber: 518,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                        lineNumber: 516,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            recommendedProducts.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-4 sm:mb-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xs sm:text-sm font-medium text-green-700 mb-2 sm:mb-3 flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "w-2 h-2 bg-green-500 rounded-full"
                                            }, void 0, false, {
                                                fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                                                lineNumber: 528,
                                                columnNumber: 19
                                            }, this),
                                            dict.recommended_for,
                                            " ",
                                            dict[projectType]
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                                        lineNumber: 527,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-4",
                                        children: recommendedProducts.map((product)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setSelectedProduct(product),
                                                className: `p-3 sm:p-4 rounded-lg border-2 transition-all text-left ${selectedProduct?.id === product.id ? 'border-green-500 bg-green-50' : 'border-green-200 hover:border-green-400 bg-green-50/50'}`,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "font-medium text-gray-900 mb-1 text-sm sm:text-base",
                                                        children: product.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                                                        lineNumber: 542,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-xs sm:text-sm text-gray-600",
                                                        children: [
                                                            product.thickness,
                                                            " x ",
                                                            product.width,
                                                            " x ",
                                                            (product.length / 100).toFixed(2),
                                                            " cm/m"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                                                        lineNumber: 543,
                                                        columnNumber: 23
                                                    }, this),
                                                    product.price && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-xs sm:text-sm text-green-700 font-semibold mt-1",
                                                        children: product.price
                                                    }, void 0, false, {
                                                        fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                                                        lineNumber: 547,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, product.id, true, {
                                                fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                                                lineNumber: 533,
                                                columnNumber: 21
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                                        lineNumber: 531,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                                lineNumber: 526,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-3 sm:p-4 bg-white rounded-lg border border-gray-200",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block text-xs sm:text-sm font-medium text-gray-700 mb-2",
                                        children: dict.all_products
                                    }, void 0, false, {
                                        fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                                        lineNumber: 559,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        value: selectedProduct?.id || '',
                                        onChange: (e)=>{
                                            const product = allProducts.find((p)=>p.id === e.target.value);
                                            if (product) setSelectedProduct(product);
                                        },
                                        className: "w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "",
                                                children: dict.select_product
                                            }, void 0, false, {
                                                fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                                                lineNumber: 570,
                                                columnNumber: 17
                                            }, this),
                                            allProducts.map((product)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: product.id,
                                                    children: [
                                                        product.name,
                                                        " - ",
                                                        product.thickness,
                                                        "x",
                                                        product.width,
                                                        "x",
                                                        (product.length / 100).toFixed(2),
                                                        "cm",
                                                        product.price ? ` (${product.price})` : ''
                                                    ]
                                                }, product.id, true, {
                                                    fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                                                    lineNumber: 572,
                                                    columnNumber: 19
                                                }, this))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                                        lineNumber: 562,
                                        columnNumber: 15
                                    }, this),
                                    selectedProduct && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-2 p-2 sm:p-3 bg-gray-50 rounded text-xs sm:text-sm",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "font-medium text-gray-900",
                                                children: selectedProduct.name
                                            }, void 0, false, {
                                                fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                                                lineNumber: 580,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-gray-600",
                                                children: [
                                                    selectedProduct.thickness,
                                                    " x ",
                                                    selectedProduct.width,
                                                    " x ",
                                                    (selectedProduct.length / 100).toFixed(2),
                                                    " cm/m"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                                                lineNumber: 581,
                                                columnNumber: 19
                                            }, this),
                                            selectedProduct.price && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-green-700 font-semibold mt-1",
                                                children: selectedProduct.price
                                            }, void 0, false, {
                                                fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                                                lineNumber: 585,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                                        lineNumber: 579,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                                lineNumber: 558,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true)
                ]
            }, void 0, true, {
                fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                lineNumber: 509,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col sm:flex-row gap-2 sm:gap-4 mb-6 sm:mb-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: calculate,
                        className: "flex-1 px-4 sm:px-6 py-2.5 sm:py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 text-sm sm:text-base",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calculator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Calculator$3e$__["Calculator"], {
                                className: "w-4 h-4 sm:w-5 sm:h-5"
                            }, void 0, false, {
                                fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                                lineNumber: 602,
                                columnNumber: 11
                            }, this),
                            dict.calculate
                        ]
                    }, void 0, true, {
                        fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                        lineNumber: 598,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: clear,
                        className: "px-4 sm:px-6 py-2.5 sm:py-3 border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold rounded-lg transition-colors text-sm sm:text-base",
                        children: dict.clear
                    }, void 0, false, {
                        fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                        lineNumber: 605,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                lineNumber: 597,
                columnNumber: 7
            }, this),
            results && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white rounded-xl p-3 sm:p-4 lg:p-6 border border-gray-200 shadow-sm animate-in fade-in slide-in-from-bottom-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                        className: "text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__["Info"], {
                                className: "w-4 h-4 sm:w-5 sm:h-5 text-green-600"
                            }, void 0, false, {
                                fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                                lineNumber: 617,
                                columnNumber: 13
                            }, this),
                            dict.results
                        ]
                    }, void 0, true, {
                        fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                        lineNumber: 616,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-4 sm:mb-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-center p-3 sm:p-4 bg-green-50 rounded-lg",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xs sm:text-sm text-gray-600 mb-1",
                                        children: dict.total_area
                                    }, void 0, false, {
                                        fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                                        lineNumber: 624,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-2xl sm:text-3xl font-bold text-green-900",
                                        children: results.totalArea.toFixed(2)
                                    }, void 0, false, {
                                        fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                                        lineNumber: 625,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xs sm:text-sm text-gray-500",
                                        children: dict.sqm
                                    }, void 0, false, {
                                        fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                                        lineNumber: 628,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                                lineNumber: 623,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-center p-3 sm:p-4 bg-blue-50 rounded-lg",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xs sm:text-sm text-gray-600 mb-1",
                                        children: dict.pieces_needed
                                    }, void 0, false, {
                                        fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                                        lineNumber: 633,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-2xl sm:text-3xl font-bold text-blue-900",
                                        children: results.piecesNeeded
                                    }, void 0, false, {
                                        fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                                        lineNumber: 634,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xs sm:text-sm text-gray-500",
                                        children: dict.piece
                                    }, void 0, false, {
                                        fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                                        lineNumber: 637,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                                lineNumber: 632,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-center p-3 sm:p-4 bg-red-50 rounded-lg",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xs sm:text-sm text-gray-600 mb-1",
                                        children: [
                                            dict.waste_amount,
                                            " (",
                                            parseFloat(wastePercentage) || 0,
                                            "%)"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                                        lineNumber: 642,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-2xl sm:text-3xl font-bold text-red-900",
                                        children: results.wasteAmount.toFixed(2)
                                    }, void 0, false, {
                                        fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                                        lineNumber: 645,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xs sm:text-sm text-gray-500",
                                        children: dict.sqm
                                    }, void 0, false, {
                                        fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                                        lineNumber: 648,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                                lineNumber: 641,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-center p-3 sm:p-4 bg-orange-50 rounded-lg",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xs sm:text-sm text-gray-600 mb-1",
                                        children: dict.total_with_waste
                                    }, void 0, false, {
                                        fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                                        lineNumber: 653,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-2xl sm:text-3xl font-bold text-orange-900",
                                        children: results.areaWithWaste.toFixed(2)
                                    }, void 0, false, {
                                        fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                                        lineNumber: 654,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xs sm:text-sm text-gray-500",
                                        children: dict.sqm
                                    }, void 0, false, {
                                        fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                                        lineNumber: 657,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                                lineNumber: 652,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                        lineNumber: 621,
                        columnNumber: 11
                    }, this),
                    selectedProduct && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-3 sm:p-4 bg-gray-50 rounded-lg space-y-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-xs sm:text-sm text-gray-700",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                        children: [
                                            dict.recommended_product,
                                            ":"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                                        lineNumber: 665,
                                        columnNumber: 17
                                    }, this),
                                    " ",
                                    selectedProduct.name
                                ]
                            }, void 0, true, {
                                fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                                lineNumber: 664,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-xs sm:text-sm text-gray-600",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                        children: [
                                            dict.coverage_per_piece,
                                            ":"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                                        lineNumber: 668,
                                        columnNumber: 17
                                    }, this),
                                    " ",
                                    (selectedProduct.width / 100 * (selectedProduct.length / 100)).toFixed(2),
                                    " ",
                                    dict.sqm
                                ]
                            }, void 0, true, {
                                fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                                lineNumber: 667,
                                columnNumber: 15
                            }, this),
                            results.gapBetweenPieces !== undefined && results.gapBetweenPieces > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xs sm:text-sm text-gray-600",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                children: [
                                                    dict.gap_between_pieces,
                                                    ":"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                                                lineNumber: 673,
                                                columnNumber: 21
                                            }, this),
                                            " ",
                                            results.gapBetweenPieces.toFixed(1),
                                            " cm"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                                        lineNumber: 672,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xs sm:text-sm text-blue-700",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                children: [
                                                    dict.effective_width,
                                                    ":"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                                                lineNumber: 676,
                                                columnNumber: 21
                                            }, this),
                                            " ",
                                            (selectedProduct.width + results.gapBetweenPieces).toFixed(1),
                                            " cm (",
                                            selectedProduct.width,
                                            " + ",
                                            results.gapBetweenPieces,
                                            ")"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                                        lineNumber: 675,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true),
                            selectedProduct.price && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-xs sm:text-sm text-green-700",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                        children: [
                                            dict.cost_per_piece,
                                            ":"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                                        lineNumber: 682,
                                        columnNumber: 19
                                    }, this),
                                    " ",
                                    selectedProduct.price
                                ]
                            }, void 0, true, {
                                fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                                lineNumber: 681,
                                columnNumber: 17
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                        lineNumber: 663,
                        columnNumber: 13
                    }, this),
                    results.estimatedCost !== undefined && results.costPerPiece !== undefined ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-4 sm:mt-6 p-3 sm:p-4 lg:p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border-2 border-green-200",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                className: "text-base sm:text-lg font-bold text-green-900 mb-3 sm:mb-4 flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calculator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Calculator$3e$__["Calculator"], {
                                        className: "w-4 h-4 sm:w-5 sm:h-5"
                                    }, void 0, false, {
                                        fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                                        lineNumber: 692,
                                        columnNumber: 17
                                    }, this),
                                    dict.estimated_cost
                                ]
                            }, void 0, true, {
                                fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                                lineNumber: 691,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex justify-between items-center p-2 sm:p-3 bg-white rounded-lg border border-green-200",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xs sm:text-sm text-gray-700",
                                                children: [
                                                    dict.cost_per_piece,
                                                    ":"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                                                lineNumber: 699,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-sm sm:text-base font-bold text-green-900",
                                                children: [
                                                    results.costPerPiece.toFixed(2),
                                                    " ",
                                                    dict.thb
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                                                lineNumber: 700,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                                        lineNumber: 698,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex justify-between items-center p-2 sm:p-3 bg-white rounded-lg border border-green-300",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xs sm:text-sm font-semibold text-gray-900",
                                                children: [
                                                    dict.total_cost,
                                                    ":"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                                                lineNumber: 707,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-lg sm:text-xl font-bold text-green-900",
                                                children: [
                                                    results.estimatedCost.toLocaleString('en-US', {
                                                        minimumFractionDigits: 2,
                                                        maximumFractionDigits: 2
                                                    }),
                                                    " ",
                                                    dict.thb
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                                                lineNumber: 708,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                                        lineNumber: 706,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                                lineNumber: 696,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-3 sm:mt-4 p-2 sm:p-3 bg-white rounded-lg border border-green-100",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-xs text-gray-600 space-y-1",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-medium",
                                                children: results.piecesNeeded
                                            }, void 0, false, {
                                                fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                                                lineNumber: 718,
                                                columnNumber: 21
                                            }, this),
                                            " ",
                                            dict.piece,
                                            " × ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-medium",
                                                children: results.costPerPiece.toFixed(2)
                                            }, void 0, false, {
                                                fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                                                lineNumber: 718,
                                                columnNumber: 96
                                            }, this),
                                            " ",
                                            dict.thb,
                                            " = ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-bold text-green-900",
                                                children: [
                                                    results.estimatedCost.toLocaleString('en-US', {
                                                        minimumFractionDigits: 2,
                                                        maximumFractionDigits: 2
                                                    }),
                                                    " ",
                                                    dict.thb
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                                                lineNumber: 718,
                                                columnNumber: 180
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                                        lineNumber: 717,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                                    lineNumber: 716,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                                lineNumber: 715,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                        lineNumber: 690,
                        columnNumber: 13
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-4 sm:mt-6 p-3 sm:p-4 bg-yellow-50 rounded-xl border border-yellow-200",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-start gap-2 sm:gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                                    className: "w-4 h-4 sm:w-5 sm:h-5 text-yellow-600 flex-shrink-0 mt-0.5"
                                }, void 0, false, {
                                    fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                                    lineNumber: 726,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-xs sm:text-sm font-semibold text-yellow-900 mb-1",
                                            children: dict.price_not_available
                                        }, void 0, false, {
                                            fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                                            lineNumber: 728,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-xs text-yellow-800",
                                            children: dict.contact_for_quote
                                        }, void 0, false, {
                                            fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                                            lineNumber: 731,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                                    lineNumber: 727,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                            lineNumber: 725,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                        lineNumber: 724,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                lineNumber: 615,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4 sm:mt-6 p-3 sm:p-4 lg:p-6 bg-blue-50 rounded-xl border border-blue-100",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                        className: "font-semibold text-blue-900 mb-2 sm:mb-3 flex items-center gap-2 text-sm sm:text-base",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                                className: "w-4 h-4 sm:w-5 sm:h-5"
                            }, void 0, false, {
                                fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                                lineNumber: 744,
                                columnNumber: 11
                            }, this),
                            dict.tips_title
                        ]
                    }, void 0, true, {
                        fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                        lineNumber: 743,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                        className: "space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-blue-800",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                className: "flex items-start gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-blue-600 mt-0.5 text-sm sm:text-base",
                                        children: "•"
                                    }, void 0, false, {
                                        fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                                        lineNumber: 749,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs sm:text-sm",
                                        children: dict.tip1
                                    }, void 0, false, {
                                        fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                                        lineNumber: 750,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                                lineNumber: 748,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                className: "flex items-start gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-blue-600 mt-0.5 text-sm sm:text-base",
                                        children: "•"
                                    }, void 0, false, {
                                        fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                                        lineNumber: 753,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs sm:text-sm",
                                        children: dict.tip2
                                    }, void 0, false, {
                                        fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                                        lineNumber: 754,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                                lineNumber: 752,
                                columnNumber: 11
                            }, this),
                            projectType === 'siding' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                className: "flex items-start gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-blue-600 mt-0.5 text-sm sm:text-base",
                                        children: "•"
                                    }, void 0, false, {
                                        fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                                        lineNumber: 758,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs sm:text-sm",
                                        children: dict.tip3
                                    }, void 0, false, {
                                        fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                                        lineNumber: 759,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                                lineNumber: 757,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                className: "flex items-start gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-blue-600 mt-0.5 text-sm sm:text-base",
                                        children: "•"
                                    }, void 0, false, {
                                        fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                                        lineNumber: 763,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sakwood$2d$wp$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs sm:text-sm",
                                        children: dict.tip4
                                    }, void 0, false, {
                                        fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                                        lineNumber: 764,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                                lineNumber: 762,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                        lineNumber: 747,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
                lineNumber: 742,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/sakwood-wp/frontend/components/products/RoomCalculator.tsx",
        lineNumber: 268,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=sakwood-wp_frontend_components_products_RoomCalculator_tsx_6f86754e._.js.map