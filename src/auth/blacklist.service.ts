import { Injectable } from "@nestjs/common";

@Injectable()
export class BlacklistService {
    private readonly blacklist = new Set<string>(); // Puedes usar Redis o DB en producción

    async addToBlacklist(token: string) {
        this.blacklist.add(token);
    }

    async isBlacklisted(token: string): Promise<boolean> {
        return this.blacklist.has(token);
    }
}
