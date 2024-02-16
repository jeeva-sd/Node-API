export interface NewBranchParams {
    name: string;
    address?: string;
    pinCode?: number;
    storageCapacity?: number;
    twoWheelerRate: number;
    fourWheelerRate: number;
}

export interface BranchData {
    orgId: string;
    name: string;
    address?: string;
    pinCode?: number;
    twoWheelerRate: number;
    fourWheelerRate: number;
    storageCapacity?: number;
    createdBy: string;
}

export interface BranchRes {
    id: string;
    name: string;
    address: string;
    pinCode: number;
    storageCapacity: number;
}