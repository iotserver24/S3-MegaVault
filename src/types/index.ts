// User interface for application
export interface User {
  email: string;
  folderId: string;
  storageLimit: number;
  usedStorage: number;
  planType: 'base' | 'pro' | 'enterprise';
  razorpayCustomerId?: string;
  razorpaySubscriptionId?: string;
  razorpayPaymentId?: string;
  additionalStorage: number;
  subscriptionStatus?: 'active' | 'past_due' | 'unpaid' | 'canceled' | 'trialing' | 'authenticated' | 'pending' | 'halted' | 'paused';
  billingCycleStart?: string; // ISO date
  billingCycleEnd?: string; // ISO date
  lastBillingDate?: string; // ISO date
  nextBillingDate?: string; // ISO date
  isBlocked: boolean;
  createdAt: string;
  updatedAt: string;
}

// Plan interface
export interface Plan {
  id: 'base' | 'pro' | 'enterprise';
  name: string;
  price: number;
  storage: number; // in GB
  additionalStorageRate: number; // per GB
  features: string[];
} 