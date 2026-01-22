import { Product } from '@/lib/types';

interface ProductSpecificationsProps {
  product: Product;
  dictionary: {
    product: {
      specifications_title: string;
      material_label: string;
      dimensions_label: string;
      weight_label: string;
      grade_label: string;
      origin_label: string;
      wood_type: string;
      standard_size: string;
      standard_weight: string;
      grade_a: string;
      imported: string;
    };
  };
}

export function ProductSpecifications({ product, dictionary }: ProductSpecificationsProps) {
  const { product: dict } = dictionary;

  // Build dimensions string if dimensions exist
  const dimensions = [];
  if (product.thickness) dimensions.push(`${product.thickness}cm`);
  if (product.width) dimensions.push(`${product.width}cm`);
  if (product.length) dimensions.push(`${product.length}m`);
  const dimensionsText = dimensions.length > 0 ? dimensions.join(' × ') : dict.standard_size;

  const specs = [
    { label: dict.material_label, value: dict.wood_type },
    { label: dict.dimensions_label, value: dimensionsText },
    { label: dict.weight_label, value: dict.standard_weight },
    { label: dict.grade_label, value: dict.grade_a },
    { label: dict.origin_label, value: dict.imported },
  ];

  return (
    <section className="mb-16" aria-labelledby="product-specifications-heading">
      <h2
        id="product-specifications-heading"
        className="text-2xl font-bold text-blue-900 mb-6 pb-2 border-b-2 border-blue-900"
      >
        {dict.specifications_title}
      </h2>

      <div className="bg-gray-50 rounded-lg p-6">
        <div className="grid md:grid-cols-2 gap-6">
          {specs.map((spec, index) => (
            <div
              key={index}
              className={`flex justify-between items-start ${index % 2 === 0 ? 'md:pr-6 md:border-r md:border-gray-200' : ''}`}
            >
              <span className="text-gray-500 font-medium">{spec.label}:</span>
              <span className="text-blue-900 font-semibold">{spec.value}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
