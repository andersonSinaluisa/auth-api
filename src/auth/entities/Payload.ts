

export interface PayloadEntity {
    email: string;
    sub: number;
    role: number;
    session_id?: string;
    device?: string;
    ip?: string;
    location?: string;
    UserAgent?: string;

}