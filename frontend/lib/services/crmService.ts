import {
  CRMCustomer,
  CRMStats,
  Interaction,
  InteractionListResponse,
  InteractionSummary,
  Task,
  TaskListResponse,
  TaskSummary,
} from '@/lib/types';

/**
 * Get customer CRM profile
 */
export async function getCRMProfile(
  userId?: number
): Promise<{ success: boolean; data?: CRMCustomer; error?: string }> {
  try {
    let url = '/api/customer-crm/profile';
    if (userId) {
      url += `?user_id=${userId}`;
    }

    const response = await fetch(url, {
      cache: 'no-store',
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return { success: false, error: errorData.error || 'Failed to fetch profile' };
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    return { success: false, error: 'Failed to fetch profile' };
  }
}

/**
 * Get customer statistics
 */
export async function getCRMStats(
  userId?: number
): Promise<{ success: boolean; data?: CRMStats; error?: string }> {
  try {
    let url = '/api/customer-crm/profile';
    if (userId) {
      url += `?user_id=${userId}`;
    }

    const response = await fetch(url, {
      cache: 'no-store',
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return { success: false, error: errorData.error || 'Failed to fetch stats' };
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    return { success: false, error: 'Failed to fetch stats' };
  }
}

/**
 * Update customer CRM profile
 */
export async function updateCRMProfile(
  updates: Partial<Pick<CRMCustomer, 'phone' | 'lineId' | 'company'>>,
  userId?: number
): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch('/api/customer-crm/profile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...updates, user_id: userId }),
      cache: 'no-store',
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return { success: false, error: errorData.error || 'Failed to update profile' };
    }

    return { success: true };
  } catch (error) {
    return { success: false, error: 'Failed to update profile' };
  }
}

/**
 * Get customer interactions
 */
export async function getInteractions(
  userId?: number,
  perPage: number = 20,
  page: number = 1,
  type?: string
): Promise<{ success: boolean; data?: InteractionListResponse; error?: string }> {
  try {
    let url = `/api/customer-crm/interactions?per_page=${perPage}&page=${page}`;
    if (userId) {
      url += `&user_id=${userId}`;
    }
    if (type) {
      url += `&type=${encodeURIComponent(type)}`;
    }

    const response = await fetch(url, {
      cache: 'no-store',
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return { success: false, error: errorData.error || 'Failed to fetch interactions' };
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    return { success: false, error: 'Failed to fetch interactions' };
  }
}

/**
 * Add customer note (interaction)
 */
export async function addCRMNote(
  message: string,
  userId?: number
): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch('/api/customer-crm/interactions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        interaction_type: 'note',
        message,
        user_id: userId,
      }),
      cache: 'no-store',
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return { success: false, error: errorData.error || 'Failed to add note' };
    }

    return { success: true };
  } catch (error) {
    return { success: false, error: 'Failed to add note' };
  }
}

/**
 * Get single interaction
 */
export async function getInteraction(
  id: number,
  userId?: number
): Promise<{ success: boolean; data?: Interaction; error?: string }> {
  try {
    // Note: This endpoint might not be implemented in WordPress yet
    // Returning placeholder
    return { success: false, error: 'Not implemented' };
  } catch (error) {
    return { success: false, error: 'Failed to fetch interaction' };
  }
}

/**
 * Get interactions summary
 */
export async function getInteractionsSummary(
  userId?: number
): Promise<{ success: boolean; data?: InteractionSummary; error?: string }> {
  try {
    const result = await getInteractions(userId, 1000, 1);

    if (!result.success || !result.data) {
      return { success: false, error: result.error || 'Failed to fetch interactions summary' };
    }

    const interactions = result.data.interactions || [];

    const summary: InteractionSummary = {
      total: interactions.length,
      byType: {
        call: interactions.filter((i) => i.interactionType === 'call').length,
        email: interactions.filter((i) => i.interactionType === 'email').length,
        line: interactions.filter((i) => i.interactionType === 'line').length,
        visit: interactions.filter((i) => i.interactionType === 'visit').length,
        note: interactions.filter((i) => i.interactionType === 'note').length,
      },
      recent: interactions.slice(0, 5),
    };

    return { success: true, data: summary };
  } catch (error) {
    return { success: false, error: 'Failed to fetch interactions summary' };
  }
}

/**
 * Get customer tasks
 */
export async function getTasks(
  userId?: number,
  perPage: number = 20,
  page: number = 1,
  status?: string
): Promise<{ success: boolean; data?: TaskListResponse; error?: string }> {
  try {
    let url = `/api/customer-crm/tasks?per_page=${perPage}&page=${page}`;
    if (userId) {
      url += `&user_id=${userId}`;
    }
    if (status) {
      url += `&status=${encodeURIComponent(status)}`;
    }

    const response = await fetch(url, {
      cache: 'no-store',
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return { success: false, error: errorData.error || 'Failed to fetch tasks' };
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    return { success: false, error: 'Failed to fetch tasks' };
  }
}

/**
 * Get single task
 */
export async function getTask(
  id: number,
  userId?: number
): Promise<{ success: boolean; data?: Task; error?: string }> {
  try {
    // Note: This endpoint might not be implemented in WordPress yet
    // Returning placeholder
    return { success: false, error: 'Not implemented' };
  } catch (error) {
    return { success: false, error: 'Failed to fetch task' };
  }
}

/**
 * Get tasks summary
 */
export async function getTasksSummary(
  userId?: number
): Promise<{ success: boolean; data?: TaskSummary; error?: string }> {
  try {
    const result = await getTasks(userId, 1000, 1);

    if (!result.success || !result.data) {
      return { success: false, error: result.error || 'Failed to fetch tasks summary' };
    }

    const tasks = result.data.tasks || [];

    const summary: TaskSummary = {
      total: tasks.length,
      pending: tasks.filter((t) => t.status === 'pending').length,
      inProgress: tasks.filter((t) => t.status === 'in_progress').length,
      completed: tasks.filter((t) => t.status === 'completed').length,
      overdue: tasks.filter((t) => {
        if (!t.dueDate) return false;
        return new Date(t.dueDate) < new Date() && t.status !== 'completed';
      }).length,
      byPriority: {
        low: tasks.filter((t) => t.priority === 'low').length,
        medium: tasks.filter((t) => t.priority === 'medium').length,
        high: tasks.filter((t) => t.priority === 'high').length,
      },
      upcoming: tasks
        .filter((t): t is Task & { dueDate: string } => t.status !== 'completed' && !!t.dueDate)
        .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
        .slice(0, 5)
        .map(({ id, title, type, priority, dueDate }) => ({ id, title, type, priority, dueDate })),
    };

    return { success: true, data: summary };
  } catch (error) {
    return { success: false, error: 'Failed to fetch tasks summary' };
  }
}

/**
 * Helper: Get interaction type label in Thai or English
 */
export function getInteractionTypeLabel(
  type: string,
  locale: string = 'th'
): string {
  const labels: Record<string, { th: string; en: string }> = {
    call: { th: 'โทร', en: 'Call' },
    email: { th: 'อีเมล', en: 'Email' },
    line: { th: 'LINE', en: 'LINE' },
    visit: { th: 'เยี่ยม', en: 'Visit' },
    note: { th: 'โน้ต', en: 'Note' },
  };

  return labels[type]?.[locale === 'en' ? 'en' : 'th'] || type;
}

/**
 * Helper: Get priority label in Thai or English
 */
export function getPriorityLabel(
  priority: string,
  locale: string = 'th'
): string {
  const labels: Record<string, { th: string; en: string }> = {
    low: { th: 'ต่ำ', en: 'Low' },
    medium: { th: 'ปานกลาง', en: 'Medium' },
    high: { th: 'สูง', en: 'High' },
  };

  return labels[priority]?.[locale === 'en' ? 'en' : 'th'] || priority;
}

/**
 * Helper: Get status label in Thai or English
 */
export function getStatusLabel(
  status: string,
  locale: string = 'th'
): string {
  const labels: Record<string, { th: string; en: string }> = {
    pending: { th: 'รอดำเนินการ', en: 'Pending' },
    in_progress: { th: 'กำลังดำเนินการ', en: 'In Progress' },
    completed: { th: 'เสร็จสิ้น', en: 'Completed' },
    overdue: { th: 'เกินกำหนด', en: 'Overdue' },
  };

  return labels[status]?.[locale === 'en' ? 'en' : 'th'] || status;
}
