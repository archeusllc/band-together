import { Elysia } from 'elysia';
declare const app: Elysia<"", {
    decorator: {
        user: {};
    };
    store: {};
    derive: {};
    resolve: {};
}, {
    typebox: {};
    error: {};
} & {
    typebox: {};
    error: {};
} & {
    typebox: import("@sinclair/typebox").TModule<{}>;
    error: {};
} & {
    typebox: {};
    error: {};
}, {
    schema: {};
    standaloneSchema: {};
    macro: {};
    macroFn: {};
    parser: {};
    response: {};
} & {
    schema: {};
    standaloneSchema: {};
    macro: {};
    macroFn: {};
    parser: {};
    response: {};
} & {
    schema: {};
    macro: {};
    macroFn: {};
    parser: {};
} & {
    schema: {};
    standaloneSchema: {};
    macro: {};
    macroFn: {};
    parser: {};
    response: {};
}, {
    get: {
        body: unknown;
        params: {};
        query: unknown;
        headers: unknown;
        response: {
            200: {
                message: string;
                status: string;
            };
        };
    };
} & {
    health: {
        get: {
            body: unknown;
            params: {};
            query: unknown;
            headers: unknown;
            response: {
                200: {
                    status: string;
                    timestamp: string;
                    checks: {
                        database: string;
                    };
                };
            };
        };
    };
} & {
    auth: {
        register: {
            post: {
                body: {
                    displayName?: string | undefined;
                    email: string;
                    firebaseUid: string;
                    idToken: string;
                };
                params: {};
                query: unknown;
                headers: unknown;
                response: {
                    200: {
                        user: {
                            email: string;
                            displayName: string | null;
                            firebaseUid: string | null;
                            userId: string;
                            avatar: string | null;
                            createdAt: Date;
                            updatedAt: Date;
                        };
                        error?: undefined;
                    } | {
                        error: string;
                        user?: undefined;
                    };
                    422: {
                        type: "validation";
                        on: string;
                        summary?: string;
                        message?: string;
                        found?: unknown;
                        property?: string;
                        expected?: string;
                    };
                };
            };
        };
    };
} & {
    auth: {
        login: {
            post: {
                body: {
                    firebaseUid: string;
                    idToken: string;
                };
                params: {};
                query: unknown;
                headers: unknown;
                response: {
                    200: {
                        user: {
                            email: string;
                            displayName: string | null;
                            firebaseUid: string | null;
                            userId: string;
                            avatar: string | null;
                            createdAt: Date;
                            updatedAt: Date;
                        };
                        error?: undefined;
                    } | {
                        error: string;
                        user?: undefined;
                    };
                    422: {
                        type: "validation";
                        on: string;
                        summary?: string;
                        message?: string;
                        found?: unknown;
                        property?: string;
                        expected?: string;
                    };
                };
            };
        };
    };
} & {
    auth: {};
} & {
    auth: {
        me: {
            get: {
                body: unknown;
                params: {};
                query: unknown;
                headers: unknown;
                response: {
                    200: {
                        email: string;
                        displayName: string | null;
                        firebaseUid: string | null;
                        userId: string;
                        avatar: string | null;
                        createdAt: Date;
                        updatedAt: Date;
                    } | {
                        error: string;
                    };
                    422: {
                        type: "validation";
                        on: string;
                        summary?: string;
                        message?: string;
                        found?: unknown;
                        property?: string;
                        expected?: string;
                    };
                };
            };
        };
    };
} & {
    auth: {
        logout: {
            get: {
                body: unknown;
                params: {};
                query: unknown;
                headers: unknown;
                response: {
                    200: {
                        success: boolean;
                    };
                    422: {
                        type: "validation";
                        on: string;
                        summary?: string;
                        message?: string;
                        found?: unknown;
                        property?: string;
                        expected?: string;
                    };
                };
            };
        };
    };
} & {
    auth: {
        reset: {
            post: {
                body: {
                    email: string;
                };
                params: {};
                query: unknown;
                headers: unknown;
                response: {
                    200: {
                        success: boolean;
                    };
                    422: {
                        type: "validation";
                        on: string;
                        summary?: string;
                        message?: string;
                        found?: unknown;
                        property?: string;
                        expected?: string;
                    };
                };
            };
        };
    };
} & {
    profile: {
        get: {
            body: unknown;
            params: {};
            query: unknown;
            headers: unknown;
            response: {
                200: "OK";
                422: {
                    type: "validation";
                    on: string;
                    summary?: string;
                    message?: string;
                    found?: unknown;
                    property?: string;
                    expected?: string;
                };
            };
        };
    };
} & {
    feed: {};
} & {
    feed: {
        get: {
            body: unknown;
            params: {};
            query: {
                page?: number | undefined;
                limit?: number | undefined;
            };
            headers: unknown;
            response: {
                422: {
                    type: "validation";
                    on: string;
                    summary?: string;
                    message?: string;
                    found?: unknown;
                    property?: string;
                    expected?: string;
                };
            };
        };
    };
} & {
    events: {};
} & {
    events: {
        get: {
            body: unknown;
            params: {};
            query: {
                page?: number | undefined;
                limit?: number | undefined;
                venueId?: string | undefined;
                actId?: string | undefined;
                startDate?: string | undefined;
                endDate?: string | undefined;
            };
            headers: unknown;
            response: {
                422: {
                    type: "validation";
                    on: string;
                    summary?: string;
                    message?: string;
                    found?: unknown;
                    property?: string;
                    expected?: string;
                };
            };
        };
    };
} & {
    events: {
        ":eventId": {
            get: {
                body: unknown;
                params: {
                    eventId: string;
                };
                query: unknown;
                headers: unknown;
                response: {
                    200: ({
                        venue: {
                            guild: {
                                createdAt: Date;
                                name: string;
                                venueId: string | null;
                                actId: string | null;
                                guildId: string;
                                guildType: import("node_modules/@band-together/shared/generated/prisma-client").$Enums.GuildType;
                                createdById: string | null;
                                currentOwnerId: string;
                                clubId: string | null;
                            } | null;
                        } & {
                            avatar: string | null;
                            createdAt: Date;
                            updatedAt: Date;
                            name: string;
                            venueId: string;
                            address: string | null;
                            city: string | null;
                            state: string | null;
                            zipCode: string | null;
                        };
                        acts: ({
                            guild: {
                                createdAt: Date;
                                name: string;
                                venueId: string | null;
                                actId: string | null;
                                guildId: string;
                                guildType: import("node_modules/@band-together/shared/generated/prisma-client").$Enums.GuildType;
                                createdById: string | null;
                                currentOwnerId: string;
                                clubId: string | null;
                            } | null;
                        } & {
                            avatar: string | null;
                            createdAt: Date;
                            updatedAt: Date;
                            name: string;
                            actId: string;
                            bio: string | null;
                        })[];
                    } & {
                        description: string | null;
                        createdAt: Date;
                        updatedAt: Date;
                        eventId: string;
                        title: string | null;
                        poster: string | null;
                        startTime: Date;
                        duration: number;
                        venueId: string;
                    }) | {
                        error: string;
                    };
                    422: {
                        type: "validation";
                        on: string;
                        summary?: string;
                        message?: string;
                        found?: unknown;
                        property?: string;
                        expected?: string;
                    };
                };
            };
        };
    };
} & {
    follows: {};
} & {
    follows: {
        get: {
            body: unknown;
            params: {};
            query: unknown;
            headers: unknown;
            response: {
                422: {
                    type: "validation";
                    on: string;
                    summary?: string;
                    message?: string;
                    found?: unknown;
                    property?: string;
                    expected?: string;
                };
            };
        };
    };
} & {
    follows: {
        post: {
            body: {
                followedUserId?: string | undefined;
                tagId?: string | undefined;
                guildId?: string | undefined;
                entityType: "USER" | "TAG" | "GUILD";
            };
            params: {};
            query: unknown;
            headers: unknown;
            response: {
                200: ({
                    guild: ({
                        venue: {
                            avatar: string | null;
                            createdAt: Date;
                            updatedAt: Date;
                            name: string;
                            venueId: string;
                            address: string | null;
                            city: string | null;
                            state: string | null;
                            zipCode: string | null;
                        } | null;
                        act: {
                            avatar: string | null;
                            createdAt: Date;
                            updatedAt: Date;
                            name: string;
                            actId: string;
                            bio: string | null;
                        } | null;
                        club: {
                            description: string | null;
                            avatar: string | null;
                            createdAt: Date;
                            updatedAt: Date;
                            name: string;
                            clubId: string;
                        } | null;
                    } & {
                        createdAt: Date;
                        name: string;
                        venueId: string | null;
                        actId: string | null;
                        guildId: string;
                        guildType: import("node_modules/@band-together/shared/generated/prisma-client").$Enums.GuildType;
                        createdById: string | null;
                        currentOwnerId: string;
                        clubId: string | null;
                    }) | null;
                    followedUser: {
                        email: string;
                        displayName: string | null;
                        firebaseUid: string | null;
                        userId: string;
                        avatar: string | null;
                        createdAt: Date;
                        updatedAt: Date;
                    } | null;
                    tag: {
                        value: string;
                        tagId: string;
                        category: string;
                    } | null;
                } & {
                    userId: string;
                    createdAt: Date;
                    followId: string;
                    entityType: import("node_modules/@band-together/shared/generated/prisma-client").$Enums.FollowEntityType;
                    followedUserId: string | null;
                    tagId: string | null;
                    guildId: string | null;
                }) | {
                    error: string;
                };
                422: {
                    type: "validation";
                    on: string;
                    summary?: string;
                    message?: string;
                    found?: unknown;
                    property?: string;
                    expected?: string;
                };
            };
        };
    };
} & {
    follows: {
        ":followId": {
            delete: {
                body: unknown;
                params: {
                    followId: string;
                };
                query: unknown;
                headers: unknown;
                response: {
                    200: {
                        success: boolean;
                    } | {
                        error: string;
                    };
                    422: {
                        type: "validation";
                        on: string;
                        summary?: string;
                        message?: string;
                        found?: unknown;
                        property?: string;
                        expected?: string;
                    };
                };
            };
        };
    };
} & {
    [x: string]: {
        get: {
            body: unknown;
            params: {};
            query: unknown;
            headers: unknown;
            response: {
                200: string;
            };
        };
    };
}, {
    derive: {};
    resolve: {};
    schema: {};
    standaloneSchema: {};
    response: {};
}, {
    derive: {};
    resolve: {};
    schema: {};
    standaloneSchema: {};
    response: {};
} & {
    derive: {};
    resolve: {};
    schema: {};
    standaloneSchema: {};
    response: {};
} & {
    derive: {};
    resolve: {};
    schema: {};
    standaloneSchema: {};
    response: {};
} & {
    derive: {};
    resolve: {};
    schema: {};
} & {
    derive: {};
    resolve: {};
    schema: {};
    standaloneSchema: {};
    response: {};
}>;
export type App = typeof app;
export {};
