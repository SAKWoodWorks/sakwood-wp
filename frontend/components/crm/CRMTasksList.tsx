'use client';

import { CheckCircle, Clock, AlertCircle, Calendar } from 'lucide-react';
import { getPriorityLabel, getStatusLabel } from '@/lib/services/crmService';
import { cn } from '@/lib/utils';
import type { Task } from '@/lib/types';

interface CRMTasksListProps {
  tasks: Task[];
  labels: {
    title: string;
    no_results: string;
    pending_tasks: string;
    completed_tasks: string;
    priority: string;
    status: string;
    due_date: string;
    call: string;
    email: string;
    line: string;
    visit: string;
    note: string;
    follow_up: string;
    payment_reminder: string;
    send_quote: string;
    order_confirmation: string;
    shipping_update: string;
  };
  locale?: string;
}

export function CRMTasksList({
  tasks,
  labels,
  locale = 'th',
}: CRMTasksListProps) {
  // Separate pending and completed tasks
  const pendingTasks = tasks.filter((t) => t.status !== 'completed');
  const completedTasks = tasks.filter((t) => t.status === 'completed');

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
      default:
        return 'bg-green-100 text-green-800 border-green-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return CheckCircle;
      case 'in_progress':
        return Clock;
      case 'pending':
      default:
        return AlertCircle;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600';
      case 'in_progress':
        return 'text-blue-600';
      case 'pending':
      default:
        return 'text-gray-600';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const diffTime = date.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return locale === 'th' ? 'เกินกำหนด' : 'Overdue';
    } else if (diffDays === 0) {
      return locale === 'th' ? 'วันนี้' : 'Today';
    } else if (diffDays === 1) {
      return locale === 'th' ? 'พรุ่งนี้' : 'Tomorrow';
    } else {
      return date.toLocaleDateString(locale === 'th' ? 'th-TH' : 'en-US', {
        month: 'short',
        day: 'numeric',
      });
    }
  };

  const isOverdue = (dueDate: string, status: string) => {
    if (status === 'completed') return false;
    return new Date(dueDate) < new Date();
  };

  const renderTask = (task: Task) => {
    const StatusIcon = getStatusIcon(task.status);
    const priorityLabel = getPriorityLabel(task.priority, locale);
    const statusLabel = getStatusLabel(task.status, locale);
    const overdue = task.dueDate && isOverdue(task.dueDate, task.status);

    return (
      <div
        key={task.id}
        className={cn(
          'p-4 rounded-lg border transition-all',
          overdue
            ? 'bg-red-50 border-red-200'
            : 'bg-white border-gray-200 hover:shadow-md'
        )}
      >
        <div className="flex items-start gap-3">
          {/* Status Icon */}
          <div className={cn('mt-0.5', getStatusColor(task.status))}>
            <StatusIcon className="w-5 h-5" />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              {/* Priority Badge */}
              <span className={cn(
                'text-xs px-2 py-0.5 rounded border',
                getPriorityColor(task.priority)
              )}>
                {priorityLabel}
              </span>

              {/* Status Badge */}
              <span className="text-xs text-gray-600">
                {statusLabel}
              </span>

              {/* Overdue Badge */}
              {overdue && (
                <span className="text-xs px-2 py-0.5 rounded bg-red-100 text-red-800 border border-red-200">
                  {locale === 'th' ? 'เกินกำหนด' : 'Overdue'}
                </span>
              )}
            </div>

            <h4 className="font-medium text-gray-900 mb-1">
              {task.title}
            </h4>

            {task.description && (
              <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                {task.description}
              </p>
            )}

            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Calendar className="w-3 h-3" />
              {labels.due_date}: {task.dueDate ? formatDate(task.dueDate) : '-'}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <CheckCircle className="w-5 h-5" />
          {labels.title}
        </h2>
      </div>

      <div className="p-6 space-y-8">
        {/* Pending Tasks */}
        <div>
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-4">
            {labels.pending_tasks} ({pendingTasks.length})
          </h3>
          {pendingTasks.length > 0 ? (
            <div className="space-y-3">
              {pendingTasks.map(renderTask)}
            </div>
          ) : (
            <div className="text-center text-gray-500 py-8">
              {labels.no_results}
            </div>
          )}
        </div>

        {/* Completed Tasks */}
        {completedTasks.length > 0 && (
          <div>
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-4">
              {labels.completed_tasks} ({completedTasks.length})
            </h3>
            <div className="space-y-3 opacity-60">
              {completedTasks.map(renderTask)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
