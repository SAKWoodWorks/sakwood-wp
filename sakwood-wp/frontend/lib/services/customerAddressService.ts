/**
 * Customer Address Service
 * Manages customer addresses via WordPress REST API
 */

export interface CustomerAddress {
  id: string;
  user_id: number;
  first_name: string;
  last_name: string;
  company: string;
  address_1: string;
  address_2: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
  phone: string;
  is_default?: boolean;
  created_at: string;
  updated_at: string;
}

export interface AddressesResponse {
  addresses: CustomerAddress[];
  total: number;
}

/**
 * Get all customer addresses
 */
export async function getCustomerAddresses(userId?: number): Promise<AddressesResponse> {
  try {
    const url = userId ? `/api/customer-addresses?user_id=${userId}` : '/api/customer-addresses';
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      return { addresses: [], total: 0 };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return { addresses: [], total: 0 };
  }
}

/**
 * Create new address
 */
export async function createCustomerAddress(address: Omit<CustomerAddress, 'id' | 'user_id' | 'created_at' | 'updated_at'>, userId?: number): Promise<{ success: boolean; address?: CustomerAddress; message?: string; error?: string }> {
  try {
    const response = await fetch('/api/customer-addresses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userId ? { ...address, user_id: userId } : address),
      cache: 'no-store',
    });

    const data = await response.json();

    if (!response.ok) {
      return { success: false, error: data.error || 'Failed to create address' };
    }

    return { success: true, address: data.address, message: data.message };
  } catch (error) {
    return { success: false, error: 'Failed to create address' };
  }
}

/**
 * Update existing address
 */
export async function updateCustomerAddress(
  addressId: string,
  address: Partial<CustomerAddress>,
  userId?: number
): Promise<{ success: boolean; address?: CustomerAddress; message?: string; error?: string }> {
  try {
    const response = await fetch(`/api/customer-addresses/${addressId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userId ? { ...address, user_id: userId } : address),
      cache: 'no-store',
    });

    const data = await response.json();

    if (!response.ok) {
      return { success: false, error: data.error || 'Failed to update address' };
    }

    return { success: true, address: data.address, message: data.message };
  } catch (error) {
    return { success: false, error: 'Failed to update address' };
  }
}

/**
 * Delete address
 */
export async function deleteCustomerAddress(
  addressId: string,
  userId?: number
): Promise<{ success: boolean; message?: string; error?: string }> {
  try {
    const url = userId ? `/api/customer-addresses/${addressId}?user_id=${userId}` : `/api/customer-addresses/${addressId}`;
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    const data = await response.json();

    if (!response.ok) {
      return { success: false, error: data.error || 'Failed to delete address' };
    }

    return { success: true, message: data.message };
  } catch (error) {
    return { success: false, error: 'Failed to delete address' };
  }
}
