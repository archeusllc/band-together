import { Elysia } from 'elysia';
declare const app: Elysia<"", {
    decorator: {};
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
                200: {
                    events: ({
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
                        };
                        acts: {
                            avatar: string | null;
                            createdAt: Date;
                            updatedAt: Date;
                            name: string;
                            actId: string;
                            bio: string | null;
                        }[];
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
                    })[];
                    total: number;
                    page: number;
                    limit: number;
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
                200: {
                    events: ({
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
                        };
                        acts: {
                            avatar: string | null;
                            createdAt: Date;
                            updatedAt: Date;
                            name: string;
                            actId: string;
                            bio: string | null;
                        }[];
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
                    })[];
                    total: number;
                    page: number;
                    limit: number;
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
                200: {
                    follows: ({
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
                            tagId: string;
                            category: string;
                            value: string;
                        } | null;
                    } & {
                        userId: string;
                        createdAt: Date;
                        followId: string;
                        entityType: import("node_modules/@band-together/shared/generated/prisma-client").$Enums.FollowEntityType;
                        followedUserId: string | null;
                        tagId: string | null;
                        guildId: string | null;
                    })[];
                    total: number;
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
                        tagId: string;
                        category: string;
                        value: string;
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
    tracks: {
        search: {
            get: {
                body: unknown;
                params: {};
                query: {
                    query?: string | undefined;
                    type?: string | undefined;
                    limit?: number | undefined;
                    offset?: number | undefined;
                    sortBy?: string | undefined;
                    sortOrder?: string | undefined;
                };
                headers: unknown;
                response: {
                    200: {
                        data: import("@band-together/shared").TrackSearchResult[];
                        total: number;
                        limit: number;
                        offset: number;
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
    acts: {
        get: {
            body: unknown;
            params: {};
            query: {
                search?: string | undefined;
                page?: number | undefined;
                limit?: number | undefined;
            };
            headers: unknown;
            response: {
                200: {
                    guilds: ({
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
                        currentOwner: {
                            displayName: string | null;
                            userId: string;
                            avatar: string | null;
                        };
                        members: {
                            displayName: string | null;
                            userId: string;
                            avatar: string | null;
                        }[];
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
                    })[];
                    total: number;
                    page: number;
                    limit: number;
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
} & {
    acts: {
        ":actId": {
            get: {
                body: unknown;
                params: {
                    actId: string;
                };
                query: unknown;
                headers: unknown;
                response: {
                    200: import("./types").GuildResponse | {
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
    acts: {};
} & {
    acts: {
        post: {
            body: {
                avatar?: string | undefined;
                bio?: string | undefined;
                name: string;
            };
            params: {};
            query: unknown;
            headers: unknown;
            response: {
                200: import("./types").GuildResponse | {
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
    acts: {
        ":actId": {
            patch: {
                body: {
                    avatar?: string | undefined;
                    name?: string | undefined;
                    bio?: string | undefined;
                };
                params: {
                    actId: string;
                };
                query: unknown;
                headers: unknown;
                response: {
                    200: import("./types").GuildResponse | {
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
    acts: {
        ":actId": {
            delete: {
                body: unknown;
                params: {
                    actId: string;
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
    clubs: {
        get: {
            body: unknown;
            params: {};
            query: {
                search?: string | undefined;
                page?: number | undefined;
                limit?: number | undefined;
            };
            headers: unknown;
            response: {
                200: {
                    guilds: ({
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
                        currentOwner: {
                            displayName: string | null;
                            userId: string;
                            avatar: string | null;
                        };
                        members: {
                            displayName: string | null;
                            userId: string;
                            avatar: string | null;
                        }[];
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
                    })[];
                    total: number;
                    page: number;
                    limit: number;
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
} & {
    clubs: {
        ":clubId": {
            get: {
                body: unknown;
                params: {
                    clubId: string;
                };
                query: unknown;
                headers: unknown;
                response: {
                    200: import("./types").GuildResponse | {
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
    clubs: {};
} & {
    clubs: {
        post: {
            body: {
                description?: string | undefined;
                avatar?: string | undefined;
                name: string;
            };
            params: {};
            query: unknown;
            headers: unknown;
            response: {
                200: import("./types").GuildResponse | {
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
    clubs: {
        ":clubId": {
            patch: {
                body: {
                    description?: string | undefined;
                    avatar?: string | undefined;
                    name?: string | undefined;
                };
                params: {
                    clubId: string;
                };
                query: unknown;
                headers: unknown;
                response: {
                    200: import("./types").GuildResponse | {
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
    clubs: {
        ":clubId": {
            delete: {
                body: unknown;
                params: {
                    clubId: string;
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
    venues: {
        get: {
            body: unknown;
            params: {};
            query: {
                search?: string | undefined;
                page?: number | undefined;
                limit?: number | undefined;
            };
            headers: unknown;
            response: {
                200: {
                    guilds: ({
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
                        currentOwner: {
                            displayName: string | null;
                            userId: string;
                            avatar: string | null;
                        };
                        members: {
                            displayName: string | null;
                            userId: string;
                            avatar: string | null;
                        }[];
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
                    })[];
                    total: number;
                    page: number;
                    limit: number;
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
} & {
    venues: {
        ":venueId": {
            get: {
                body: unknown;
                params: {
                    venueId: string;
                };
                query: unknown;
                headers: unknown;
                response: {
                    200: import("./types").GuildResponse | {
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
    venues: {};
} & {
    venues: {
        post: {
            body: {
                avatar?: string | undefined;
                address?: string | undefined;
                city?: string | undefined;
                state?: string | undefined;
                zipCode?: string | undefined;
                name: string;
            };
            params: {};
            query: unknown;
            headers: unknown;
            response: {
                200: import("./types").GuildResponse | {
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
    venues: {
        ":venueId": {
            patch: {
                body: {
                    avatar?: string | undefined;
                    name?: string | undefined;
                    address?: string | undefined;
                    city?: string | undefined;
                    state?: string | undefined;
                    zipCode?: string | undefined;
                };
                params: {
                    venueId: string;
                };
                query: unknown;
                headers: unknown;
                response: {
                    200: import("./types").GuildResponse | {
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
    venues: {
        ":venueId": {
            delete: {
                body: unknown;
                params: {
                    venueId: string;
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
    setlist: {};
} & {
    setlist: {
        post: {
            body: {
                description?: string | undefined;
                guildId?: string | undefined;
                name: string;
            };
            params: {};
            query: unknown;
            headers: unknown;
            response: {
                200: ({
                    setItems: ({
                        track: {
                            type: import("node_modules/@band-together/shared/generated/prisma-client").$Enums.TrackType;
                            createdAt: Date;
                            updatedAt: Date;
                            title: string;
                            createdBy: string;
                            trackId: string;
                            artist: string;
                            defaultDuration: number | null;
                            defaultTuning: string | null;
                            isActive: boolean;
                        };
                        section: {
                            createdAt: Date;
                            updatedAt: Date;
                            name: string;
                            setListId: string;
                            position: number;
                            sectionId: string;
                        } | null;
                    } & {
                        createdAt: Date;
                        updatedAt: Date;
                        trackId: string;
                        setListId: string;
                        setItemId: string;
                        position: number;
                        customTuning: string | null;
                        customNotes: string | null;
                        customDuration: number | null;
                        sectionId: string | null;
                    })[];
                    setSections: {
                        createdAt: Date;
                        updatedAt: Date;
                        name: string;
                        setListId: string;
                        position: number;
                        sectionId: string;
                    }[];
                    shares: {
                        createdAt: Date;
                        createdBy: string;
                        setListId: string;
                        shareId: string;
                        shareToken: string;
                        permission: import("node_modules/@band-together/shared/generated/prisma-client").$Enums.SharePermission;
                        expiresAt: Date | null;
                    }[];
                } & {
                    description: string | null;
                    createdAt: Date;
                    updatedAt: Date;
                    name: string;
                    guildId: string | null;
                    setListId: string;
                    isPrivate: boolean;
                    ownerId: string;
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
    setlist: {
        get: {
            body: unknown;
            params: {};
            query: unknown;
            headers: unknown;
            response: {
                200: {
                    personal: ({
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
                        setItems: ({
                            track: {
                                type: import("node_modules/@band-together/shared/generated/prisma-client").$Enums.TrackType;
                                createdAt: Date;
                                updatedAt: Date;
                                title: string;
                                createdBy: string;
                                trackId: string;
                                artist: string;
                                defaultDuration: number | null;
                                defaultTuning: string | null;
                                isActive: boolean;
                            };
                        } & {
                            createdAt: Date;
                            updatedAt: Date;
                            trackId: string;
                            setListId: string;
                            setItemId: string;
                            position: number;
                            customTuning: string | null;
                            customNotes: string | null;
                            customDuration: number | null;
                            sectionId: string | null;
                        })[];
                        shares: {
                            createdAt: Date;
                            createdBy: string;
                            setListId: string;
                            shareId: string;
                            shareToken: string;
                            permission: import("node_modules/@band-together/shared/generated/prisma-client").$Enums.SharePermission;
                            expiresAt: Date | null;
                        }[];
                    } & {
                        description: string | null;
                        createdAt: Date;
                        updatedAt: Date;
                        name: string;
                        guildId: string | null;
                        setListId: string;
                        isPrivate: boolean;
                        ownerId: string;
                    })[];
                    shared: ({
                        setItems: ({
                            track: {
                                type: import("node_modules/@band-together/shared/generated/prisma-client").$Enums.TrackType;
                                createdAt: Date;
                                updatedAt: Date;
                                title: string;
                                createdBy: string;
                                trackId: string;
                                artist: string;
                                defaultDuration: number | null;
                                defaultTuning: string | null;
                                isActive: boolean;
                            };
                        } & {
                            createdAt: Date;
                            updatedAt: Date;
                            trackId: string;
                            setListId: string;
                            setItemId: string;
                            position: number;
                            customTuning: string | null;
                            customNotes: string | null;
                            customDuration: number | null;
                            sectionId: string | null;
                        })[];
                        shares: {
                            createdAt: Date;
                            createdBy: string;
                            setListId: string;
                            shareId: string;
                            shareToken: string;
                            permission: import("node_modules/@band-together/shared/generated/prisma-client").$Enums.SharePermission;
                            expiresAt: Date | null;
                        }[];
                    } & {
                        description: string | null;
                        createdAt: Date;
                        updatedAt: Date;
                        name: string;
                        guildId: string | null;
                        setListId: string;
                        isPrivate: boolean;
                        ownerId: string;
                    })[];
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
} & {
    setlist: {
        ":setlistId": {
            patch: {
                body: {
                    description?: string | undefined;
                    name?: string | undefined;
                    guildId?: string | null | undefined;
                };
                params: {
                    setlistId: string;
                };
                query: unknown;
                headers: unknown;
                response: {
                    200: ({
                        setItems: ({
                            track: {
                                type: import("node_modules/@band-together/shared/generated/prisma-client").$Enums.TrackType;
                                createdAt: Date;
                                updatedAt: Date;
                                title: string;
                                createdBy: string;
                                trackId: string;
                                artist: string;
                                defaultDuration: number | null;
                                defaultTuning: string | null;
                                isActive: boolean;
                            };
                            section: {
                                createdAt: Date;
                                updatedAt: Date;
                                name: string;
                                setListId: string;
                                position: number;
                                sectionId: string;
                            } | null;
                        } & {
                            createdAt: Date;
                            updatedAt: Date;
                            trackId: string;
                            setListId: string;
                            setItemId: string;
                            position: number;
                            customTuning: string | null;
                            customNotes: string | null;
                            customDuration: number | null;
                            sectionId: string | null;
                        })[];
                        setSections: {
                            createdAt: Date;
                            updatedAt: Date;
                            name: string;
                            setListId: string;
                            position: number;
                            sectionId: string;
                        }[];
                        shares: {
                            createdAt: Date;
                            createdBy: string;
                            setListId: string;
                            shareId: string;
                            shareToken: string;
                            permission: import("node_modules/@band-together/shared/generated/prisma-client").$Enums.SharePermission;
                            expiresAt: Date | null;
                        }[];
                    } & {
                        description: string | null;
                        createdAt: Date;
                        updatedAt: Date;
                        name: string;
                        guildId: string | null;
                        setListId: string;
                        isPrivate: boolean;
                        ownerId: string;
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
    setlist: {
        ":setlistId": {
            delete: {
                body: unknown;
                params: {
                    setlistId: string;
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
    setlist: {
        ":setlistId": {
            duplicate: {
                post: {
                    body: unknown;
                    params: {
                        setlistId: string;
                    };
                    query: unknown;
                    headers: unknown;
                    response: {
                        200: ({
                            setItems: ({
                                track: {
                                    type: import("node_modules/@band-together/shared/generated/prisma-client").$Enums.TrackType;
                                    createdAt: Date;
                                    updatedAt: Date;
                                    title: string;
                                    createdBy: string;
                                    trackId: string;
                                    artist: string;
                                    defaultDuration: number | null;
                                    defaultTuning: string | null;
                                    isActive: boolean;
                                };
                                section: {
                                    createdAt: Date;
                                    updatedAt: Date;
                                    name: string;
                                    setListId: string;
                                    position: number;
                                    sectionId: string;
                                } | null;
                            } & {
                                createdAt: Date;
                                updatedAt: Date;
                                trackId: string;
                                setListId: string;
                                setItemId: string;
                                position: number;
                                customTuning: string | null;
                                customNotes: string | null;
                                customDuration: number | null;
                                sectionId: string | null;
                            })[];
                            setSections: {
                                createdAt: Date;
                                updatedAt: Date;
                                name: string;
                                setListId: string;
                                position: number;
                                sectionId: string;
                            }[];
                            shares: {
                                createdAt: Date;
                                createdBy: string;
                                setListId: string;
                                shareId: string;
                                shareToken: string;
                                permission: import("node_modules/@band-together/shared/generated/prisma-client").$Enums.SharePermission;
                                expiresAt: Date | null;
                            }[];
                        } & {
                            description: string | null;
                            createdAt: Date;
                            updatedAt: Date;
                            name: string;
                            guildId: string | null;
                            setListId: string;
                            isPrivate: boolean;
                            ownerId: string;
                        }) | {
                            error: string;
                        } | null;
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
    };
} & {
    setlist: {
        ":setlistId": {
            items: {
                post: {
                    body: {
                        position?: number | undefined;
                        customTuning?: string | undefined;
                        customNotes?: string | undefined;
                        customDuration?: number | undefined;
                        sectionId?: string | undefined;
                        trackId: string;
                    };
                    params: {
                        setlistId: string;
                    };
                    query: unknown;
                    headers: unknown;
                    response: {
                        200: ({
                            track: {
                                type: import("node_modules/@band-together/shared/generated/prisma-client").$Enums.TrackType;
                                createdAt: Date;
                                updatedAt: Date;
                                title: string;
                                createdBy: string;
                                trackId: string;
                                artist: string;
                                defaultDuration: number | null;
                                defaultTuning: string | null;
                                isActive: boolean;
                            };
                            section: {
                                createdAt: Date;
                                updatedAt: Date;
                                name: string;
                                setListId: string;
                                position: number;
                                sectionId: string;
                            } | null;
                        } & {
                            createdAt: Date;
                            updatedAt: Date;
                            trackId: string;
                            setListId: string;
                            setItemId: string;
                            position: number;
                            customTuning: string | null;
                            customNotes: string | null;
                            customDuration: number | null;
                            sectionId: string | null;
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
    };
} & {
    setlist: {
        ":setlistId": {
            items: {
                ":setItemId": {
                    patch: {
                        body: {
                            customTuning?: string | undefined;
                            customNotes?: string | undefined;
                            customDuration?: number | undefined;
                            sectionId?: string | null | undefined;
                        };
                        params: {
                            setItemId: string;
                            setlistId: string;
                        };
                        query: unknown;
                        headers: unknown;
                        response: {
                            200: ({
                                track: {
                                    type: import("node_modules/@band-together/shared/generated/prisma-client").$Enums.TrackType;
                                    createdAt: Date;
                                    updatedAt: Date;
                                    title: string;
                                    createdBy: string;
                                    trackId: string;
                                    artist: string;
                                    defaultDuration: number | null;
                                    defaultTuning: string | null;
                                    isActive: boolean;
                                };
                                section: {
                                    createdAt: Date;
                                    updatedAt: Date;
                                    name: string;
                                    setListId: string;
                                    position: number;
                                    sectionId: string;
                                } | null;
                            } & {
                                createdAt: Date;
                                updatedAt: Date;
                                trackId: string;
                                setListId: string;
                                setItemId: string;
                                position: number;
                                customTuning: string | null;
                                customNotes: string | null;
                                customDuration: number | null;
                                sectionId: string | null;
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
        };
    };
} & {
    setlist: {
        ":setlistId": {
            items: {
                ":setItemId": {
                    delete: {
                        body: unknown;
                        params: {
                            setItemId: string;
                            setlistId: string;
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
        };
    };
} & {
    setlist: {
        ":setlistId": {
            reorder: {
                post: {
                    body: {
                        itemPositions: {
                            setItemId: string;
                            position: number;
                        }[];
                    };
                    params: {
                        setlistId: string;
                    };
                    query: unknown;
                    headers: unknown;
                    response: {
                        200: ({
                            setItems: ({
                                track: {
                                    type: import("node_modules/@band-together/shared/generated/prisma-client").$Enums.TrackType;
                                    createdAt: Date;
                                    updatedAt: Date;
                                    title: string;
                                    createdBy: string;
                                    trackId: string;
                                    artist: string;
                                    defaultDuration: number | null;
                                    defaultTuning: string | null;
                                    isActive: boolean;
                                };
                                section: {
                                    createdAt: Date;
                                    updatedAt: Date;
                                    name: string;
                                    setListId: string;
                                    position: number;
                                    sectionId: string;
                                } | null;
                            } & {
                                createdAt: Date;
                                updatedAt: Date;
                                trackId: string;
                                setListId: string;
                                setItemId: string;
                                position: number;
                                customTuning: string | null;
                                customNotes: string | null;
                                customDuration: number | null;
                                sectionId: string | null;
                            })[];
                        } & {
                            description: string | null;
                            createdAt: Date;
                            updatedAt: Date;
                            name: string;
                            guildId: string | null;
                            setListId: string;
                            isPrivate: boolean;
                            ownerId: string;
                        }) | {
                            error: string;
                        } | null;
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
    };
} & {
    setlist: {
        ":setlistId": {
            sections: {
                post: {
                    body: {
                        position?: number | undefined;
                        name: string;
                    };
                    params: {
                        setlistId: string;
                    };
                    query: unknown;
                    headers: unknown;
                    response: {
                        200: {
                            createdAt: Date;
                            updatedAt: Date;
                            name: string;
                            setListId: string;
                            position: number;
                            sectionId: string;
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
    };
} & {
    setlist: {
        ":setlistId": {
            sections: {
                ":sectionId": {
                    patch: {
                        body: {
                            name?: string | undefined;
                        };
                        params: {
                            sectionId: string;
                            setlistId: string;
                        };
                        query: unknown;
                        headers: unknown;
                        response: {
                            200: {
                                createdAt: Date;
                                updatedAt: Date;
                                name: string;
                                setListId: string;
                                position: number;
                                sectionId: string;
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
        };
    };
} & {
    setlist: {
        ":setlistId": {
            sections: {
                ":sectionId": {
                    delete: {
                        body: unknown;
                        params: {
                            sectionId: string;
                            setlistId: string;
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
        };
    };
} & {
    setlist: {
        ":setlistId": {
            shares: {
                post: {
                    body: {
                        expiresAt?: string | undefined;
                        permission: "VIEW_ONLY" | "CAN_EDIT";
                    };
                    params: {
                        setlistId: string;
                    };
                    query: unknown;
                    headers: unknown;
                    response: {
                        200: {
                            createdAt: Date;
                            createdBy: string;
                            setListId: string;
                            shareId: string;
                            shareToken: string;
                            permission: import("node_modules/@band-together/shared/generated/prisma-client").$Enums.SharePermission;
                            expiresAt: Date | null;
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
    };
} & {
    setlist: {
        ":setlistId": {
            shares: {
                get: {
                    body: unknown;
                    params: {
                        setlistId: string;
                    };
                    query: unknown;
                    headers: unknown;
                    response: {
                        200: ({
                            creator: {
                                email: string;
                                displayName: string | null;
                                userId: string;
                            };
                        } & {
                            createdAt: Date;
                            createdBy: string;
                            setListId: string;
                            shareId: string;
                            shareToken: string;
                            permission: import("node_modules/@band-together/shared/generated/prisma-client").$Enums.SharePermission;
                            expiresAt: Date | null;
                        })[] | {
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
    };
} & {
    setlist: {
        ":setlistId": {
            shares: {
                ":shareId": {
                    delete: {
                        body: unknown;
                        params: {
                            shareId: string;
                            setlistId: string;
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
        };
    };
} & {
    setlist: {
        ":setlistId": {
            get: {
                body: unknown;
                params: {
                    setlistId: string;
                };
                query: {
                    shareToken?: string | undefined;
                };
                headers: unknown;
                response: {
                    200: ({
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
                        setItems: ({
                            track: {
                                type: import("node_modules/@band-together/shared/generated/prisma-client").$Enums.TrackType;
                                createdAt: Date;
                                updatedAt: Date;
                                title: string;
                                createdBy: string;
                                trackId: string;
                                artist: string;
                                defaultDuration: number | null;
                                defaultTuning: string | null;
                                isActive: boolean;
                            };
                            section: {
                                createdAt: Date;
                                updatedAt: Date;
                                name: string;
                                setListId: string;
                                position: number;
                                sectionId: string;
                            } | null;
                        } & {
                            createdAt: Date;
                            updatedAt: Date;
                            trackId: string;
                            setListId: string;
                            setItemId: string;
                            position: number;
                            customTuning: string | null;
                            customNotes: string | null;
                            customDuration: number | null;
                            sectionId: string | null;
                        })[];
                        owner: {
                            email: string;
                            userId: string;
                        };
                        setSections: {
                            createdAt: Date;
                            updatedAt: Date;
                            name: string;
                            setListId: string;
                            position: number;
                            sectionId: string;
                        }[];
                        shares: {
                            createdAt: Date;
                            createdBy: string;
                            setListId: string;
                            shareId: string;
                            shareToken: string;
                            permission: import("node_modules/@band-together/shared/generated/prisma-client").$Enums.SharePermission;
                            expiresAt: Date | null;
                        }[];
                    } & {
                        description: string | null;
                        createdAt: Date;
                        updatedAt: Date;
                        name: string;
                        guildId: string | null;
                        setListId: string;
                        isPrivate: boolean;
                        ownerId: string;
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
