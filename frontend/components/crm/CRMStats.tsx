import { Package, ShoppingCart, CreditCard, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CRMStatsProps {
  stats: {
    total_orders?: number;
    total_spent?: number;
    avg_order_value?: number;
    member_since?: string;
  };
  labels: {
    total_orders: string;
    total_spent: string;
    avg_order_value: string;
    member_since: string;
  };
  className?: string;
}

export function CRMStats({ stats, labels, className }: CRMStatsProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('th-TH', {
      style: 'currency',
      currency: 'THB',
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const cards = [
    {
      icon: Package,
      label: labels.total_orders,
      value: stats.total_orders?.toString() || '0',
      color: 'blue',
    },
    {
      icon: ShoppingCart,
      label: labels.total_spent,
      value: stats.total_spent ? formatCurrency(stats.total_spent) : '-',
      color: 'green',
    },
    {
      icon: CreditCard,
      label: labels.avg_order_value,
      value: stats.avg_order_value ? formatCurrency(stats.avg_order_value) : '-',
      color: 'yellow',
    },
    {
      icon: TrendingUp,
      label: labels.member_since,
      value: stats.member_since ? formatDate(stats.member_since) : '-',
      color: 'red',
    },
  ];

  return (
    <div className={className}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card, index) => {
          const colorClasses = {
            blue: 'bg-blue-50 text-blue-600 border-blue-200',
            green: 'bg-green-50 text-green-600 border-green-200',
            yellow: 'bg-yellow-50 text-yellow-600 border-yellow-200',
            red: 'bg-red-50 text-red-600 border-red-200',
          };

          return (
            <div
              key={index}
              className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-4">
                <div className={cn(
                  'p-3 rounded-lg border',
                  colorClasses[card.color as keyof typeof colorClasses]
                )}>
                  <card.icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-600 mb-1">{card.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{card.value}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
