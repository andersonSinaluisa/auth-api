import { SessionDto } from "src/sessions/dto/session.dto";


export class SessionMapper {


    static toDto(session: any): SessionDto {
        return {
            id: session.id,
            session_id: session.session_id,
            userId: session.userId,
            deleted: session.deleted,
            createdAt: session.createdAt,
            updatedAt: session.updatedAt,
            ip: session.ip,
            UserAgent: session.UserAgent,
            location: session.location,
            device: session.device,
            status: session.status,
            user:{
                id: session.user.id,
                email: session.user.email,
                first_name: session.user.first_name,
                last_name: session.user.last_name,
                phone: session.user.phone,
                address: session.user.address,
                role_id: session.user.role_id,
                deleted: session.user.deleted,
                is_active: session.user.is_active,
                last_login: session.user.last_login,
                created_at: session.user.createdAt,
                updated_at: session.user.updatedAt,
                
            }
        } as SessionDto;
    }

}