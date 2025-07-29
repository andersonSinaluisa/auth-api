-- AlterTable
ALTER TABLE "App" ADD COLUMN     "tenantId" TEXT DEFAULT 'default_tenant';

-- AlterTable
ALTER TABLE "Log" ADD COLUMN     "tenantId" TEXT DEFAULT 'default_tenant';

-- AlterTable
ALTER TABLE "LogAction" ADD COLUMN     "tenantId" TEXT DEFAULT 'default_tenant';

-- AlterTable
ALTER TABLE "Permission" ADD COLUMN     "tenantId" TEXT DEFAULT 'default_tenant';

-- AlterTable
ALTER TABLE "Role" ADD COLUMN     "tenantId" TEXT DEFAULT 'default_tenant';

-- AlterTable
ALTER TABLE "Session" ADD COLUMN     "tenantId" TEXT DEFAULT 'default_tenant';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "tenantId" TEXT DEFAULT 'default_tenant';

-- AlterTable
ALTER TABLE "UserAzureAD" ADD COLUMN     "tenantId" TEXT DEFAULT 'default_tenant';
