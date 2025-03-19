export interface Customer {
    id: number;
    name: string;
    email: string;
    phone?: string;
    createdAt: Date;
    updatedAt: Date;
}


export interface Appointment {
    id: number;
    customerId: number;
    staffId: number;
    service: string;
    dateTime: Date;
    status: AppointmentStatus;
    createdAt: Date;
    updatedAt: Date;
}

export interface Product {
    id: number;
    name: string;
    description?: string;
    price: number;
    stock: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface Sale {
    id: number;
    customerId: number;
    productId?: number;
    quantity: number;
    totalAmount: number;
    staffId: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface Staff {
    id: number;
    name: string;
    email: string;
    password: string;
    phone?: string;
    role: StaffRole;
    createdAt: Date;
    updatedAt: Date;
}

export interface Performance {
    id: number;
    staffId: number;
    metric: PerformanceMetric;
    value: number;
    date: Date;
    createdAt: Date;
    updatedAt: Date;
}

enum AppointmentStatus {
    SCHEDULED = "Scheduled",
    COMPLETED = "Completed",
    CANCELLED = "Cancelled",
}

enum StaffRole {
    STYLIST = "Stylist",
    MANAGER = "Manager",
    RECEPTIONIST = "Receptionist",
}

enum PerformanceMetric {
    APPOINTMENTS_COMPLETED = "Appointments Completed",
    SALES_REVENUE = "Sales Revenue",
    CUSTOMER_SATISFACTION = "Customer Satisfaction",
    UPSELLS = "Upsells",
    NO_SHOWS = "No-Shows",
    AVERAGE_SERVICE_TIME = "Average Service Time",
}


export type CreateCustomer = Omit<Customer, "id" | "createdAt" | "updatedAt">;
export type UpdateCustomer = Partial<CreateCustomer>;

export type CreateAppointment = Omit<Appointment, "id" | "createdAt" | "updatedAt">;
export type UpdateAppointment = Partial<CreateAppointment>;

export type CreateProduct = Omit<Product, "id" | "createdAt" | "updatedAt">;
export type UpdateProduct = Partial<CreateProduct>;

export type CreateSale = Omit<Sale, "id" | "createdAt" | "updatedAt">;
export type UpdateSale = Partial<CreateSale>;

export type CreateStaff = Omit<Staff, "id" | "createdAt" | "updatedAt">;
export type UpdateStaff = Partial<CreateStaff>;

export type CreatePerformance = Omit<Performance, "id" | "createdAt" | "updatedAt">;
export type UpdatePerformance = Partial<CreatePerformance>;