-- CreateEnum
CREATE TYPE "user_role" AS ENUM ('admin', 'researcher', 'guest');

-- CreateTable
CREATE TABLE "users" (
    "username" VARCHAR(255) NOT NULL,
    "hashedpassword" VARCHAR(255) NOT NULL,
    "role" "user_role" NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("username")
);

-- CreateTable
CREATE TABLE "grbevent" (
    "event_name" VARCHAR(100) NOT NULL,
    "event_date" TIMESTAMP(6),
    "location" VARCHAR(255),
    "description" TEXT,

    CONSTRAINT "grbevent_pkey" PRIMARY KEY ("event_name")
);

-- CreateTable
CREATE TABLE "observations" (
    "observation_id" SERIAL NOT NULL,
    "event_name" VARCHAR(255) NOT NULL,
    "observation_date" DATE NOT NULL,
    "observation_time" TIME(6) NOT NULL,
    "duration" DECIMAL NOT NULL,
    "frequency" DECIMAL NOT NULL,
    "bandwidth" DECIMAL NOT NULL,
    "configuration" VARCHAR(255),
    "detection" BOOLEAN NOT NULL,
    "flux_density" DECIMAL,
    "flux_density_error" DECIMAL,
    "rms" DECIMAL,
    "notes" TEXT,
    "observer_name" VARCHAR(255),
    "burst_advocate" VARCHAR(255),
    "username" VARCHAR(255),

    CONSTRAINT "observations_pkey" PRIMARY KEY ("observation_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- AddForeignKey
ALTER TABLE "observations" ADD CONSTRAINT "fk_observations_username" FOREIGN KEY ("username") REFERENCES "users"("username") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "observations" ADD CONSTRAINT "observations_event_name_fkey" FOREIGN KEY ("event_name") REFERENCES "grbevent"("event_name") ON DELETE NO ACTION ON UPDATE NO ACTION;
