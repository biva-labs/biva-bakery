import { sql } from "drizzle-orm";
import {
    serial,
    text,
    integer,
    pgTable,
    boolean,
    timestamp,
    unique,
    index,
    foreignKey,
    pgEnum,
} from "drizzle-orm/pg-core";

export const role = pgEnum("role", [
    "user",
    "admin",
    "employee",
    "media-handler",
]);

export const foodCourtTable = pgTable("foodCourtTable", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    total_people: integer("total_people").notNull().default(1),
    status: text("status").notNull().default("available"),
    aadhar_or_pan_img_url: text("aadhar_or_pan_img_url").notNull(),
    phone_number: text("phone_number").notNull().unique(),
    email: text("email").notNull(),
    food_preference: text("food_preference").notNull().default("veg"),
    timeSlot: text("time_slot").notNull(),
    paid: boolean("paid").notNull().default(false),
    totalAmount: integer("total_amount").notNull(),
    createdAt: timestamp("created_at")
        .notNull()
        .default(sql`now()`),
});

export const foodCourtEventTable = pgTable("foodCourtEventTable", {
    id: serial("id").primaryKey(),
    eventId: text("event_id").notNull(),
    name: text("name").notNull(),
    email: text("email").notNull().unique(),
    status: text("status").notNull().default("available"),
    aadhar_or_pan_img_url: text("aadhar_or_pan_img_url").notNull(),
    phone_number: text("phone_number").unique().notNull(),
    total_people: integer("total_people").notNull().default(1),
    paid: boolean("paid").notNull().default(false),
    total_amount: integer("total_amount").notNull(),
    createdAt: timestamp("created_at")
        .notNull()
        .default(sql`now()`),
});

export const hotelRoomReservation = pgTable(
    "hotelRoomReservation",
    {
        id: serial("id").primaryKey(),
        applicationId: text("application_id")
            .default(sql`gen_random_uuid()`)
            .notNull(),
        name: text("name").notNull(),
        email: text("email").notNull(),
        aadharOrPanImgUrl: text("aadhar_or_pan_img_url").notNull(),
        secondaryDocImgUrl: text("secondary_doc_img_url"),
        phoneNumber: text("phone_number").notNull(),
        totalPeople: integer("total_people").default(1).notNull(),
        totalRooms: integer("total_rooms").default(1).notNull(),
        paid: boolean("paid").default(false).notNull(),
        totalAmount: integer("total_amount").notNull(),
        createdAt: timestamp("created_at", { mode: "string" })
            .defaultNow()
            .notNull(),
        joinDate: text("join_date").notNull(),
        leaveDate: text("leave_date").notNull(),
        roomType: text("room_type").notNull(),
    },
    (table) => [
        unique("hotelRoomReservation_application_id_unique").on(
            table.applicationId,
        ),
        index("hotelRoomReservation_email_idx").on(table.email),
    ],
);

export const adminHotelRoomReservation = pgTable(
    "adminHotelRoomReservation",
    {
        roomId: serial("room_id").primaryKey(),
        typeOfRoom: text("type_of_room").notNull(),
        occupancy: integer("occupancy").notNull(),
        price: integer("price").notNull(),
        onSale: boolean("on_sale").default(false).notNull(),
        saleValue: integer("sale_value"),
        roomImage: text("room-image").notNull(),
        totalRooms: text("total_rooms").default("1").notNull(),
    },
    (table) => [
        unique("adminHotelRoomReservation_type_of_room_key").on(
            table.typeOfRoom,
        ),
    ],
);

export const adminEventTable = pgTable(
    "adminEventTable",
    {
        id: integer("id").primaryKey().generatedAlwaysAsIdentity({
            name: "adminFoodCourtTable_id_seq",
            startWith: 1,
            increment: 1,
            minValue: 1,
            maxValue: 2147483647,
        }),
        eventId: text("event_id").notNull(),
        eventName: text("event_name").notNull(),
        groupName: text("group_name").notNull(),
        ticketPrice: integer("ticket_price").default(0).notNull(),
        date: text("date").notNull(),
        time: text("time").notNull(),
        banner: text("banner").notNull(),
    },
    (table) => [unique("adminFoodCourtTable_table_name_key").on(table.eventId)],
);

export const verification = pgTable("verification", {
    id: text("id").primaryKey().notNull(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expires_at", { mode: "string" }).notNull(),
    createdAt: timestamp("created_at", { mode: "string" })
        .defaultNow()
        .notNull(),
    updatedAt: timestamp("updated_at", { mode: "string" })
        .defaultNow()
        .notNull(),
});

export const user = pgTable(
    "user",
    {
        id: text("id").primaryKey().notNull(),
        name: text("name").notNull(),
        email: text("email").notNull(),
        emailVerified: boolean("email_verified").default(false).notNull(),
        role: role().default("employee").notNull(),
        phone: text("phone").default("").notNull(),
        aadharImgUrl: text("aadhar_img_url").default("").notNull(),
        image: text("image"),
        banned: boolean("banned").default(false),
        banReason: text("ban_reason"),
        banExpires: timestamp("ban_expires", { mode: "string" }),
        createdAt: timestamp("created_at", { mode: "string" })
            .defaultNow()
            .notNull(),
        updatedAt: timestamp("updated_at", { mode: "string" })
            .defaultNow()
            .notNull(),
    },
    (table) => [unique("user_email_unique").on(table.email)],
);

export const account = pgTable(
    "account",
    {
        id: text("id").primaryKey().notNull(),
        accountId: text("account_id").notNull(),
        providerId: text("provider_id").notNull(),
        userId: text("user_id").notNull(),
        accessToken: text("access_token"),
        refreshToken: text("refresh_token"),
        idToken: text("id_token"),
        accessTokenExpiresAt: timestamp("access_token_expires_at", {
            mode: "string",
        }),
        refreshTokenExpiresAt: timestamp("refresh_token_expires_at", {
            mode: "string",
        }),
        scope: text("scope"),
        password: text("password"),
        createdAt: timestamp("created_at", { mode: "string" })
            .defaultNow()
            .notNull(),
        updatedAt: timestamp("updated_at", { mode: "string" }).notNull(),
    },
    (table) => [
        foreignKey({
            columns: [table.userId],
            foreignColumns: [user.id],
            name: "account_user_id_user_id_fk",
        }).onDelete("cascade"),
    ],
);

export const session = pgTable(
    "session",
    {
        id: text("id").primaryKey().notNull(),
        expiresAt: timestamp("expires_at", { mode: "string" }).notNull(),
        token: text("token").notNull(),
        createdAt: timestamp("created_at", { mode: "string" })
            .defaultNow()
            .notNull(),
        updatedAt: timestamp("updated_at", { mode: "string" }).notNull(),
        ipAddress: text("ip_address"),
        userAgent: text("user_agent"),
        userId: text("user_id").notNull(),
    },
    (table) => [
        foreignKey({
            columns: [table.userId],
            foreignColumns: [user.id],
            name: "session_user_id_user_id_fk",
        }).onDelete("cascade"),
        unique("session_token_unique").on(table.token),
    ],
);

export const ticket = pgTable("ticket", {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity({
        name: "ticket_id_seq",
        startWith: 1,
        increment: 1,
        minValue: 1,
        maxValue: 2147483647,
        cache: 1,
    }),
    name: text("name").notNull(),
    email: text("email").notNull(),
    phone: text("phone").notNull(),
    category: text("category").notNull(),
    subject: text("subject").notNull(),
    description: text("description").notNull(),
});

export const announcements = pgTable("announcements", {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity({
        name: "announcements_id_seq",
        startWith: 1,
        increment: 1,
        minValue: 1,
        maxValue: 2147483647,
        cache: 1,
    }),
    title: text("title"),
    body: text("body"),
    displayType: text("displayType"),
    image: text("image"),
    styling: text("styling"),
});
