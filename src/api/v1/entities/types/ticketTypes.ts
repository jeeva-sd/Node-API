// export interface NewTicketParams {
//     vehicleId: string;
//     statusId: number;
//     bill: number;
//     tokenId?: string;
//     issuedBy: string;
//     issuedAt: Date;
//     duration: number;
//     description?: string;
//     clientName?: string;
//     clientNumber?: string;
//     updatedAt: Date;
//     closedAt?: Date;
// }

export interface NewTicketParams {
    tokenId?: string;
    vehicleId: string;
    statusId: number;
    description?: string;
    clientName?: string;
    clientNumber?: string;
}

export interface NewTicketData {
    tokenId?: string;
    vehicleId: string;
    statusId: number;
    description?: string;
    clientName?: string;
    clientNumber?: string;
    issuedBy: string;
    orgId: string;
    branchId: string;
}

export interface TicketRes {
    id: string;
    vehicleId: string;
    statusId: number;
    bill: number;
    tokenId: string;
    issuedBy: string;
    issuedAt: Date;
    duration: number;
    description: string;
    clientName: string;
    clientNumber: string;
    updatedAt: Date;
    closedAt: Date;
}

export interface ticketListParams {
    page: number;
    limit: number;
    statusId: number;
}

export interface ticketListRes {
    id: string;
    vehicleId: string;
    statusId: number;
    tokenId: string;
    orgId: string;
    branchId: string;
    bill: number;
    issuedBy: string;
    issuedAt: Date;
    duration: number;
    description: string;
    clientName: string;
    clientNumber: string;
    updatedAt: Date;
    closedAt: Date;
}