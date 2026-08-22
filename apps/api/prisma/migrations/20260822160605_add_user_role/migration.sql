/*
  Warnings:

  - The values [BOOLEAN] on the enum `AttributeTypeEnum` will be removed. If these variants are still used in the database, this will fail.

*/
-- CreateEnum
CREATE TYPE "UserRoleEnum" AS ENUM ('USER', 'ADMIN');

-- AlterEnum
BEGIN;
CREATE TYPE "AttributeTypeEnum_new" AS ENUM ('SELECT', 'MULTISELECT', 'RANGE');
ALTER TABLE "public"."Attribute" ALTER COLUMN "type" DROP DEFAULT;
ALTER TABLE "Attribute" ALTER COLUMN "type" TYPE "AttributeTypeEnum_new" USING ("type"::text::"AttributeTypeEnum_new");
ALTER TYPE "AttributeTypeEnum" RENAME TO "AttributeTypeEnum_old";
ALTER TYPE "AttributeTypeEnum_new" RENAME TO "AttributeTypeEnum";
DROP TYPE "public"."AttributeTypeEnum_old";
ALTER TABLE "Attribute" ALTER COLUMN "type" SET DEFAULT 'MULTISELECT';
COMMIT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "UserRoleEnum" NOT NULL DEFAULT 'USER';
