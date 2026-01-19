
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Follow
 * 
 */
export type Follow = $Result.DefaultSelection<Prisma.$FollowPayload>
/**
 * Model Tag
 * 
 */
export type Tag = $Result.DefaultSelection<Prisma.$TagPayload>
/**
 * Model Guild
 * 
 */
export type Guild = $Result.DefaultSelection<Prisma.$GuildPayload>
/**
 * Model Act
 * 
 */
export type Act = $Result.DefaultSelection<Prisma.$ActPayload>
/**
 * Model Venue
 * 
 */
export type Venue = $Result.DefaultSelection<Prisma.$VenuePayload>
/**
 * Model Club
 * 
 */
export type Club = $Result.DefaultSelection<Prisma.$ClubPayload>
/**
 * Model CalendarEvent
 * 
 */
export type CalendarEvent = $Result.DefaultSelection<Prisma.$CalendarEventPayload>
/**
 * Model FeedActivity
 * 
 */
export type FeedActivity = $Result.DefaultSelection<Prisma.$FeedActivityPayload>
/**
 * Model GuildInvitation
 * 
 */
export type GuildInvitation = $Result.DefaultSelection<Prisma.$GuildInvitationPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const GuildType: {
  ACT: 'ACT',
  VENUE: 'VENUE',
  CLUB: 'CLUB'
};

export type GuildType = (typeof GuildType)[keyof typeof GuildType]


export const GuildInvitationStatus: {
  PENDING: 'PENDING',
  ACCEPTED: 'ACCEPTED',
  REJECTED: 'REJECTED',
  CANCELLED: 'CANCELLED'
};

export type GuildInvitationStatus = (typeof GuildInvitationStatus)[keyof typeof GuildInvitationStatus]


export const FollowEntityType: {
  USER: 'USER',
  TAG: 'TAG',
  GUILD: 'GUILD'
};

export type FollowEntityType = (typeof FollowEntityType)[keyof typeof FollowEntityType]

}

export type GuildType = $Enums.GuildType

export const GuildType: typeof $Enums.GuildType

export type GuildInvitationStatus = $Enums.GuildInvitationStatus

export const GuildInvitationStatus: typeof $Enums.GuildInvitationStatus

export type FollowEntityType = $Enums.FollowEntityType

export const FollowEntityType: typeof $Enums.FollowEntityType

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.follow`: Exposes CRUD operations for the **Follow** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Follows
    * const follows = await prisma.follow.findMany()
    * ```
    */
  get follow(): Prisma.FollowDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.tag`: Exposes CRUD operations for the **Tag** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tags
    * const tags = await prisma.tag.findMany()
    * ```
    */
  get tag(): Prisma.TagDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.guild`: Exposes CRUD operations for the **Guild** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Guilds
    * const guilds = await prisma.guild.findMany()
    * ```
    */
  get guild(): Prisma.GuildDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.act`: Exposes CRUD operations for the **Act** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Acts
    * const acts = await prisma.act.findMany()
    * ```
    */
  get act(): Prisma.ActDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.venue`: Exposes CRUD operations for the **Venue** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Venues
    * const venues = await prisma.venue.findMany()
    * ```
    */
  get venue(): Prisma.VenueDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.club`: Exposes CRUD operations for the **Club** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Clubs
    * const clubs = await prisma.club.findMany()
    * ```
    */
  get club(): Prisma.ClubDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.calendarEvent`: Exposes CRUD operations for the **CalendarEvent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CalendarEvents
    * const calendarEvents = await prisma.calendarEvent.findMany()
    * ```
    */
  get calendarEvent(): Prisma.CalendarEventDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.feedActivity`: Exposes CRUD operations for the **FeedActivity** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more FeedActivities
    * const feedActivities = await prisma.feedActivity.findMany()
    * ```
    */
  get feedActivity(): Prisma.FeedActivityDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.guildInvitation`: Exposes CRUD operations for the **GuildInvitation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more GuildInvitations
    * const guildInvitations = await prisma.guildInvitation.findMany()
    * ```
    */
  get guildInvitation(): Prisma.GuildInvitationDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.2.0
   * Query Engine version: 0c8ef2ce45c83248ab3df073180d5eda9e8be7a3
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Follow: 'Follow',
    Tag: 'Tag',
    Guild: 'Guild',
    Act: 'Act',
    Venue: 'Venue',
    Club: 'Club',
    CalendarEvent: 'CalendarEvent',
    FeedActivity: 'FeedActivity',
    GuildInvitation: 'GuildInvitation'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "follow" | "tag" | "guild" | "act" | "venue" | "club" | "calendarEvent" | "feedActivity" | "guildInvitation"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Follow: {
        payload: Prisma.$FollowPayload<ExtArgs>
        fields: Prisma.FollowFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FollowFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FollowPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FollowFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FollowPayload>
          }
          findFirst: {
            args: Prisma.FollowFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FollowPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FollowFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FollowPayload>
          }
          findMany: {
            args: Prisma.FollowFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FollowPayload>[]
          }
          create: {
            args: Prisma.FollowCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FollowPayload>
          }
          createMany: {
            args: Prisma.FollowCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FollowCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FollowPayload>[]
          }
          delete: {
            args: Prisma.FollowDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FollowPayload>
          }
          update: {
            args: Prisma.FollowUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FollowPayload>
          }
          deleteMany: {
            args: Prisma.FollowDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FollowUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FollowUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FollowPayload>[]
          }
          upsert: {
            args: Prisma.FollowUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FollowPayload>
          }
          aggregate: {
            args: Prisma.FollowAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFollow>
          }
          groupBy: {
            args: Prisma.FollowGroupByArgs<ExtArgs>
            result: $Utils.Optional<FollowGroupByOutputType>[]
          }
          count: {
            args: Prisma.FollowCountArgs<ExtArgs>
            result: $Utils.Optional<FollowCountAggregateOutputType> | number
          }
        }
      }
      Tag: {
        payload: Prisma.$TagPayload<ExtArgs>
        fields: Prisma.TagFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TagFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TagFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>
          }
          findFirst: {
            args: Prisma.TagFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TagFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>
          }
          findMany: {
            args: Prisma.TagFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>[]
          }
          create: {
            args: Prisma.TagCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>
          }
          createMany: {
            args: Prisma.TagCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TagCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>[]
          }
          delete: {
            args: Prisma.TagDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>
          }
          update: {
            args: Prisma.TagUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>
          }
          deleteMany: {
            args: Prisma.TagDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TagUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TagUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>[]
          }
          upsert: {
            args: Prisma.TagUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>
          }
          aggregate: {
            args: Prisma.TagAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTag>
          }
          groupBy: {
            args: Prisma.TagGroupByArgs<ExtArgs>
            result: $Utils.Optional<TagGroupByOutputType>[]
          }
          count: {
            args: Prisma.TagCountArgs<ExtArgs>
            result: $Utils.Optional<TagCountAggregateOutputType> | number
          }
        }
      }
      Guild: {
        payload: Prisma.$GuildPayload<ExtArgs>
        fields: Prisma.GuildFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GuildFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuildPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GuildFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuildPayload>
          }
          findFirst: {
            args: Prisma.GuildFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuildPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GuildFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuildPayload>
          }
          findMany: {
            args: Prisma.GuildFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuildPayload>[]
          }
          create: {
            args: Prisma.GuildCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuildPayload>
          }
          createMany: {
            args: Prisma.GuildCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GuildCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuildPayload>[]
          }
          delete: {
            args: Prisma.GuildDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuildPayload>
          }
          update: {
            args: Prisma.GuildUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuildPayload>
          }
          deleteMany: {
            args: Prisma.GuildDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GuildUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.GuildUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuildPayload>[]
          }
          upsert: {
            args: Prisma.GuildUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuildPayload>
          }
          aggregate: {
            args: Prisma.GuildAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGuild>
          }
          groupBy: {
            args: Prisma.GuildGroupByArgs<ExtArgs>
            result: $Utils.Optional<GuildGroupByOutputType>[]
          }
          count: {
            args: Prisma.GuildCountArgs<ExtArgs>
            result: $Utils.Optional<GuildCountAggregateOutputType> | number
          }
        }
      }
      Act: {
        payload: Prisma.$ActPayload<ExtArgs>
        fields: Prisma.ActFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ActFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ActFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActPayload>
          }
          findFirst: {
            args: Prisma.ActFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ActFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActPayload>
          }
          findMany: {
            args: Prisma.ActFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActPayload>[]
          }
          create: {
            args: Prisma.ActCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActPayload>
          }
          createMany: {
            args: Prisma.ActCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ActCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActPayload>[]
          }
          delete: {
            args: Prisma.ActDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActPayload>
          }
          update: {
            args: Prisma.ActUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActPayload>
          }
          deleteMany: {
            args: Prisma.ActDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ActUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ActUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActPayload>[]
          }
          upsert: {
            args: Prisma.ActUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActPayload>
          }
          aggregate: {
            args: Prisma.ActAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAct>
          }
          groupBy: {
            args: Prisma.ActGroupByArgs<ExtArgs>
            result: $Utils.Optional<ActGroupByOutputType>[]
          }
          count: {
            args: Prisma.ActCountArgs<ExtArgs>
            result: $Utils.Optional<ActCountAggregateOutputType> | number
          }
        }
      }
      Venue: {
        payload: Prisma.$VenuePayload<ExtArgs>
        fields: Prisma.VenueFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VenueFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VenuePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VenueFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VenuePayload>
          }
          findFirst: {
            args: Prisma.VenueFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VenuePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VenueFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VenuePayload>
          }
          findMany: {
            args: Prisma.VenueFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VenuePayload>[]
          }
          create: {
            args: Prisma.VenueCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VenuePayload>
          }
          createMany: {
            args: Prisma.VenueCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VenueCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VenuePayload>[]
          }
          delete: {
            args: Prisma.VenueDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VenuePayload>
          }
          update: {
            args: Prisma.VenueUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VenuePayload>
          }
          deleteMany: {
            args: Prisma.VenueDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VenueUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.VenueUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VenuePayload>[]
          }
          upsert: {
            args: Prisma.VenueUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VenuePayload>
          }
          aggregate: {
            args: Prisma.VenueAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVenue>
          }
          groupBy: {
            args: Prisma.VenueGroupByArgs<ExtArgs>
            result: $Utils.Optional<VenueGroupByOutputType>[]
          }
          count: {
            args: Prisma.VenueCountArgs<ExtArgs>
            result: $Utils.Optional<VenueCountAggregateOutputType> | number
          }
        }
      }
      Club: {
        payload: Prisma.$ClubPayload<ExtArgs>
        fields: Prisma.ClubFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ClubFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClubPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ClubFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClubPayload>
          }
          findFirst: {
            args: Prisma.ClubFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClubPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ClubFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClubPayload>
          }
          findMany: {
            args: Prisma.ClubFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClubPayload>[]
          }
          create: {
            args: Prisma.ClubCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClubPayload>
          }
          createMany: {
            args: Prisma.ClubCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ClubCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClubPayload>[]
          }
          delete: {
            args: Prisma.ClubDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClubPayload>
          }
          update: {
            args: Prisma.ClubUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClubPayload>
          }
          deleteMany: {
            args: Prisma.ClubDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ClubUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ClubUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClubPayload>[]
          }
          upsert: {
            args: Prisma.ClubUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClubPayload>
          }
          aggregate: {
            args: Prisma.ClubAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateClub>
          }
          groupBy: {
            args: Prisma.ClubGroupByArgs<ExtArgs>
            result: $Utils.Optional<ClubGroupByOutputType>[]
          }
          count: {
            args: Prisma.ClubCountArgs<ExtArgs>
            result: $Utils.Optional<ClubCountAggregateOutputType> | number
          }
        }
      }
      CalendarEvent: {
        payload: Prisma.$CalendarEventPayload<ExtArgs>
        fields: Prisma.CalendarEventFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CalendarEventFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CalendarEventPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CalendarEventFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CalendarEventPayload>
          }
          findFirst: {
            args: Prisma.CalendarEventFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CalendarEventPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CalendarEventFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CalendarEventPayload>
          }
          findMany: {
            args: Prisma.CalendarEventFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CalendarEventPayload>[]
          }
          create: {
            args: Prisma.CalendarEventCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CalendarEventPayload>
          }
          createMany: {
            args: Prisma.CalendarEventCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CalendarEventCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CalendarEventPayload>[]
          }
          delete: {
            args: Prisma.CalendarEventDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CalendarEventPayload>
          }
          update: {
            args: Prisma.CalendarEventUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CalendarEventPayload>
          }
          deleteMany: {
            args: Prisma.CalendarEventDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CalendarEventUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CalendarEventUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CalendarEventPayload>[]
          }
          upsert: {
            args: Prisma.CalendarEventUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CalendarEventPayload>
          }
          aggregate: {
            args: Prisma.CalendarEventAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCalendarEvent>
          }
          groupBy: {
            args: Prisma.CalendarEventGroupByArgs<ExtArgs>
            result: $Utils.Optional<CalendarEventGroupByOutputType>[]
          }
          count: {
            args: Prisma.CalendarEventCountArgs<ExtArgs>
            result: $Utils.Optional<CalendarEventCountAggregateOutputType> | number
          }
        }
      }
      FeedActivity: {
        payload: Prisma.$FeedActivityPayload<ExtArgs>
        fields: Prisma.FeedActivityFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FeedActivityFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedActivityPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FeedActivityFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedActivityPayload>
          }
          findFirst: {
            args: Prisma.FeedActivityFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedActivityPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FeedActivityFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedActivityPayload>
          }
          findMany: {
            args: Prisma.FeedActivityFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedActivityPayload>[]
          }
          create: {
            args: Prisma.FeedActivityCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedActivityPayload>
          }
          createMany: {
            args: Prisma.FeedActivityCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FeedActivityCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedActivityPayload>[]
          }
          delete: {
            args: Prisma.FeedActivityDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedActivityPayload>
          }
          update: {
            args: Prisma.FeedActivityUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedActivityPayload>
          }
          deleteMany: {
            args: Prisma.FeedActivityDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FeedActivityUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FeedActivityUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedActivityPayload>[]
          }
          upsert: {
            args: Prisma.FeedActivityUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedActivityPayload>
          }
          aggregate: {
            args: Prisma.FeedActivityAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFeedActivity>
          }
          groupBy: {
            args: Prisma.FeedActivityGroupByArgs<ExtArgs>
            result: $Utils.Optional<FeedActivityGroupByOutputType>[]
          }
          count: {
            args: Prisma.FeedActivityCountArgs<ExtArgs>
            result: $Utils.Optional<FeedActivityCountAggregateOutputType> | number
          }
        }
      }
      GuildInvitation: {
        payload: Prisma.$GuildInvitationPayload<ExtArgs>
        fields: Prisma.GuildInvitationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GuildInvitationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuildInvitationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GuildInvitationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuildInvitationPayload>
          }
          findFirst: {
            args: Prisma.GuildInvitationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuildInvitationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GuildInvitationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuildInvitationPayload>
          }
          findMany: {
            args: Prisma.GuildInvitationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuildInvitationPayload>[]
          }
          create: {
            args: Prisma.GuildInvitationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuildInvitationPayload>
          }
          createMany: {
            args: Prisma.GuildInvitationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GuildInvitationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuildInvitationPayload>[]
          }
          delete: {
            args: Prisma.GuildInvitationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuildInvitationPayload>
          }
          update: {
            args: Prisma.GuildInvitationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuildInvitationPayload>
          }
          deleteMany: {
            args: Prisma.GuildInvitationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GuildInvitationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.GuildInvitationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuildInvitationPayload>[]
          }
          upsert: {
            args: Prisma.GuildInvitationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuildInvitationPayload>
          }
          aggregate: {
            args: Prisma.GuildInvitationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGuildInvitation>
          }
          groupBy: {
            args: Prisma.GuildInvitationGroupByArgs<ExtArgs>
            result: $Utils.Optional<GuildInvitationGroupByOutputType>[]
          }
          count: {
            args: Prisma.GuildInvitationCountArgs<ExtArgs>
            result: $Utils.Optional<GuildInvitationCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    follow?: FollowOmit
    tag?: TagOmit
    guild?: GuildOmit
    act?: ActOmit
    venue?: VenueOmit
    club?: ClubOmit
    calendarEvent?: CalendarEventOmit
    feedActivity?: FeedActivityOmit
    guildInvitation?: GuildInvitationOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    createdGuilds: number
    ownedGuilds: number
    memberOfGuilds: number
    follows: number
    followedBy: number
    feedActivities: number
    sentInvitations: number
    receivedInvitations: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    createdGuilds?: boolean | UserCountOutputTypeCountCreatedGuildsArgs
    ownedGuilds?: boolean | UserCountOutputTypeCountOwnedGuildsArgs
    memberOfGuilds?: boolean | UserCountOutputTypeCountMemberOfGuildsArgs
    follows?: boolean | UserCountOutputTypeCountFollowsArgs
    followedBy?: boolean | UserCountOutputTypeCountFollowedByArgs
    feedActivities?: boolean | UserCountOutputTypeCountFeedActivitiesArgs
    sentInvitations?: boolean | UserCountOutputTypeCountSentInvitationsArgs
    receivedInvitations?: boolean | UserCountOutputTypeCountReceivedInvitationsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCreatedGuildsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GuildWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountOwnedGuildsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GuildWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountMemberOfGuildsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GuildWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountFollowsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FollowWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountFollowedByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FollowWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountFeedActivitiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FeedActivityWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSentInvitationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GuildInvitationWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountReceivedInvitationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GuildInvitationWhereInput
  }


  /**
   * Count Type TagCountOutputType
   */

  export type TagCountOutputType = {
    follows: number
  }

  export type TagCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    follows?: boolean | TagCountOutputTypeCountFollowsArgs
  }

  // Custom InputTypes
  /**
   * TagCountOutputType without action
   */
  export type TagCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TagCountOutputType
     */
    select?: TagCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TagCountOutputType without action
   */
  export type TagCountOutputTypeCountFollowsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FollowWhereInput
  }


  /**
   * Count Type GuildCountOutputType
   */

  export type GuildCountOutputType = {
    members: number
    follows: number
    invitations: number
  }

  export type GuildCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    members?: boolean | GuildCountOutputTypeCountMembersArgs
    follows?: boolean | GuildCountOutputTypeCountFollowsArgs
    invitations?: boolean | GuildCountOutputTypeCountInvitationsArgs
  }

  // Custom InputTypes
  /**
   * GuildCountOutputType without action
   */
  export type GuildCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GuildCountOutputType
     */
    select?: GuildCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * GuildCountOutputType without action
   */
  export type GuildCountOutputTypeCountMembersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
  }

  /**
   * GuildCountOutputType without action
   */
  export type GuildCountOutputTypeCountFollowsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FollowWhereInput
  }

  /**
   * GuildCountOutputType without action
   */
  export type GuildCountOutputTypeCountInvitationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GuildInvitationWhereInput
  }


  /**
   * Count Type ActCountOutputType
   */

  export type ActCountOutputType = {
    calendarEvents: number
  }

  export type ActCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    calendarEvents?: boolean | ActCountOutputTypeCountCalendarEventsArgs
  }

  // Custom InputTypes
  /**
   * ActCountOutputType without action
   */
  export type ActCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActCountOutputType
     */
    select?: ActCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ActCountOutputType without action
   */
  export type ActCountOutputTypeCountCalendarEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CalendarEventWhereInput
  }


  /**
   * Count Type VenueCountOutputType
   */

  export type VenueCountOutputType = {
    calendarEvents: number
  }

  export type VenueCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    calendarEvents?: boolean | VenueCountOutputTypeCountCalendarEventsArgs
  }

  // Custom InputTypes
  /**
   * VenueCountOutputType without action
   */
  export type VenueCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VenueCountOutputType
     */
    select?: VenueCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * VenueCountOutputType without action
   */
  export type VenueCountOutputTypeCountCalendarEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CalendarEventWhereInput
  }


  /**
   * Count Type CalendarEventCountOutputType
   */

  export type CalendarEventCountOutputType = {
    acts: number
    feedActivities: number
  }

  export type CalendarEventCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    acts?: boolean | CalendarEventCountOutputTypeCountActsArgs
    feedActivities?: boolean | CalendarEventCountOutputTypeCountFeedActivitiesArgs
  }

  // Custom InputTypes
  /**
   * CalendarEventCountOutputType without action
   */
  export type CalendarEventCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CalendarEventCountOutputType
     */
    select?: CalendarEventCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CalendarEventCountOutputType without action
   */
  export type CalendarEventCountOutputTypeCountActsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ActWhereInput
  }

  /**
   * CalendarEventCountOutputType without action
   */
  export type CalendarEventCountOutputTypeCountFeedActivitiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FeedActivityWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    userId: string | null
    email: string | null
    displayName: string | null
    avatar: string | null
    firebaseUid: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    userId: string | null
    email: string | null
    displayName: string | null
    avatar: string | null
    firebaseUid: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    userId: number
    email: number
    displayName: number
    avatar: number
    firebaseUid: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    userId?: true
    email?: true
    displayName?: true
    avatar?: true
    firebaseUid?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    userId?: true
    email?: true
    displayName?: true
    avatar?: true
    firebaseUid?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    userId?: true
    email?: true
    displayName?: true
    avatar?: true
    firebaseUid?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    userId: string
    email: string
    displayName: string | null
    avatar: string | null
    firebaseUid: string | null
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    email?: boolean
    displayName?: boolean
    avatar?: boolean
    firebaseUid?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    createdGuilds?: boolean | User$createdGuildsArgs<ExtArgs>
    ownedGuilds?: boolean | User$ownedGuildsArgs<ExtArgs>
    memberOfGuilds?: boolean | User$memberOfGuildsArgs<ExtArgs>
    follows?: boolean | User$followsArgs<ExtArgs>
    followedBy?: boolean | User$followedByArgs<ExtArgs>
    feedActivities?: boolean | User$feedActivitiesArgs<ExtArgs>
    sentInvitations?: boolean | User$sentInvitationsArgs<ExtArgs>
    receivedInvitations?: boolean | User$receivedInvitationsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    email?: boolean
    displayName?: boolean
    avatar?: boolean
    firebaseUid?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    email?: boolean
    displayName?: boolean
    avatar?: boolean
    firebaseUid?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    userId?: boolean
    email?: boolean
    displayName?: boolean
    avatar?: boolean
    firebaseUid?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"userId" | "email" | "displayName" | "avatar" | "firebaseUid" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    createdGuilds?: boolean | User$createdGuildsArgs<ExtArgs>
    ownedGuilds?: boolean | User$ownedGuildsArgs<ExtArgs>
    memberOfGuilds?: boolean | User$memberOfGuildsArgs<ExtArgs>
    follows?: boolean | User$followsArgs<ExtArgs>
    followedBy?: boolean | User$followedByArgs<ExtArgs>
    feedActivities?: boolean | User$feedActivitiesArgs<ExtArgs>
    sentInvitations?: boolean | User$sentInvitationsArgs<ExtArgs>
    receivedInvitations?: boolean | User$receivedInvitationsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      createdGuilds: Prisma.$GuildPayload<ExtArgs>[]
      ownedGuilds: Prisma.$GuildPayload<ExtArgs>[]
      memberOfGuilds: Prisma.$GuildPayload<ExtArgs>[]
      follows: Prisma.$FollowPayload<ExtArgs>[]
      followedBy: Prisma.$FollowPayload<ExtArgs>[]
      feedActivities: Prisma.$FeedActivityPayload<ExtArgs>[]
      sentInvitations: Prisma.$GuildInvitationPayload<ExtArgs>[]
      receivedInvitations: Prisma.$GuildInvitationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      userId: string
      email: string
      displayName: string | null
      avatar: string | null
      firebaseUid: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `userId`
     * const userWithUserIdOnly = await prisma.user.findMany({ select: { userId: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `userId`
     * const userWithUserIdOnly = await prisma.user.createManyAndReturn({
     *   select: { userId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `userId`
     * const userWithUserIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { userId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    createdGuilds<T extends User$createdGuildsArgs<ExtArgs> = {}>(args?: Subset<T, User$createdGuildsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GuildPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    ownedGuilds<T extends User$ownedGuildsArgs<ExtArgs> = {}>(args?: Subset<T, User$ownedGuildsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GuildPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    memberOfGuilds<T extends User$memberOfGuildsArgs<ExtArgs> = {}>(args?: Subset<T, User$memberOfGuildsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GuildPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    follows<T extends User$followsArgs<ExtArgs> = {}>(args?: Subset<T, User$followsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FollowPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    followedBy<T extends User$followedByArgs<ExtArgs> = {}>(args?: Subset<T, User$followedByArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FollowPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    feedActivities<T extends User$feedActivitiesArgs<ExtArgs> = {}>(args?: Subset<T, User$feedActivitiesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FeedActivityPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    sentInvitations<T extends User$sentInvitationsArgs<ExtArgs> = {}>(args?: Subset<T, User$sentInvitationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GuildInvitationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    receivedInvitations<T extends User$receivedInvitationsArgs<ExtArgs> = {}>(args?: Subset<T, User$receivedInvitationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GuildInvitationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly userId: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly displayName: FieldRef<"User", 'String'>
    readonly avatar: FieldRef<"User", 'String'>
    readonly firebaseUid: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.createdGuilds
   */
  export type User$createdGuildsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Guild
     */
    select?: GuildSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Guild
     */
    omit?: GuildOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuildInclude<ExtArgs> | null
    where?: GuildWhereInput
    orderBy?: GuildOrderByWithRelationInput | GuildOrderByWithRelationInput[]
    cursor?: GuildWhereUniqueInput
    take?: number
    skip?: number
    distinct?: GuildScalarFieldEnum | GuildScalarFieldEnum[]
  }

  /**
   * User.ownedGuilds
   */
  export type User$ownedGuildsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Guild
     */
    select?: GuildSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Guild
     */
    omit?: GuildOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuildInclude<ExtArgs> | null
    where?: GuildWhereInput
    orderBy?: GuildOrderByWithRelationInput | GuildOrderByWithRelationInput[]
    cursor?: GuildWhereUniqueInput
    take?: number
    skip?: number
    distinct?: GuildScalarFieldEnum | GuildScalarFieldEnum[]
  }

  /**
   * User.memberOfGuilds
   */
  export type User$memberOfGuildsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Guild
     */
    select?: GuildSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Guild
     */
    omit?: GuildOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuildInclude<ExtArgs> | null
    where?: GuildWhereInput
    orderBy?: GuildOrderByWithRelationInput | GuildOrderByWithRelationInput[]
    cursor?: GuildWhereUniqueInput
    take?: number
    skip?: number
    distinct?: GuildScalarFieldEnum | GuildScalarFieldEnum[]
  }

  /**
   * User.follows
   */
  export type User$followsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Follow
     */
    select?: FollowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Follow
     */
    omit?: FollowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FollowInclude<ExtArgs> | null
    where?: FollowWhereInput
    orderBy?: FollowOrderByWithRelationInput | FollowOrderByWithRelationInput[]
    cursor?: FollowWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FollowScalarFieldEnum | FollowScalarFieldEnum[]
  }

  /**
   * User.followedBy
   */
  export type User$followedByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Follow
     */
    select?: FollowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Follow
     */
    omit?: FollowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FollowInclude<ExtArgs> | null
    where?: FollowWhereInput
    orderBy?: FollowOrderByWithRelationInput | FollowOrderByWithRelationInput[]
    cursor?: FollowWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FollowScalarFieldEnum | FollowScalarFieldEnum[]
  }

  /**
   * User.feedActivities
   */
  export type User$feedActivitiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeedActivity
     */
    select?: FeedActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the FeedActivity
     */
    omit?: FeedActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedActivityInclude<ExtArgs> | null
    where?: FeedActivityWhereInput
    orderBy?: FeedActivityOrderByWithRelationInput | FeedActivityOrderByWithRelationInput[]
    cursor?: FeedActivityWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FeedActivityScalarFieldEnum | FeedActivityScalarFieldEnum[]
  }

  /**
   * User.sentInvitations
   */
  export type User$sentInvitationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GuildInvitation
     */
    select?: GuildInvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GuildInvitation
     */
    omit?: GuildInvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuildInvitationInclude<ExtArgs> | null
    where?: GuildInvitationWhereInput
    orderBy?: GuildInvitationOrderByWithRelationInput | GuildInvitationOrderByWithRelationInput[]
    cursor?: GuildInvitationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: GuildInvitationScalarFieldEnum | GuildInvitationScalarFieldEnum[]
  }

  /**
   * User.receivedInvitations
   */
  export type User$receivedInvitationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GuildInvitation
     */
    select?: GuildInvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GuildInvitation
     */
    omit?: GuildInvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuildInvitationInclude<ExtArgs> | null
    where?: GuildInvitationWhereInput
    orderBy?: GuildInvitationOrderByWithRelationInput | GuildInvitationOrderByWithRelationInput[]
    cursor?: GuildInvitationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: GuildInvitationScalarFieldEnum | GuildInvitationScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Follow
   */

  export type AggregateFollow = {
    _count: FollowCountAggregateOutputType | null
    _min: FollowMinAggregateOutputType | null
    _max: FollowMaxAggregateOutputType | null
  }

  export type FollowMinAggregateOutputType = {
    followId: string | null
    userId: string | null
    entityType: $Enums.FollowEntityType | null
    followedUserId: string | null
    tagId: string | null
    guildId: string | null
    createdAt: Date | null
  }

  export type FollowMaxAggregateOutputType = {
    followId: string | null
    userId: string | null
    entityType: $Enums.FollowEntityType | null
    followedUserId: string | null
    tagId: string | null
    guildId: string | null
    createdAt: Date | null
  }

  export type FollowCountAggregateOutputType = {
    followId: number
    userId: number
    entityType: number
    followedUserId: number
    tagId: number
    guildId: number
    createdAt: number
    _all: number
  }


  export type FollowMinAggregateInputType = {
    followId?: true
    userId?: true
    entityType?: true
    followedUserId?: true
    tagId?: true
    guildId?: true
    createdAt?: true
  }

  export type FollowMaxAggregateInputType = {
    followId?: true
    userId?: true
    entityType?: true
    followedUserId?: true
    tagId?: true
    guildId?: true
    createdAt?: true
  }

  export type FollowCountAggregateInputType = {
    followId?: true
    userId?: true
    entityType?: true
    followedUserId?: true
    tagId?: true
    guildId?: true
    createdAt?: true
    _all?: true
  }

  export type FollowAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Follow to aggregate.
     */
    where?: FollowWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Follows to fetch.
     */
    orderBy?: FollowOrderByWithRelationInput | FollowOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FollowWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Follows from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Follows.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Follows
    **/
    _count?: true | FollowCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FollowMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FollowMaxAggregateInputType
  }

  export type GetFollowAggregateType<T extends FollowAggregateArgs> = {
        [P in keyof T & keyof AggregateFollow]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFollow[P]>
      : GetScalarType<T[P], AggregateFollow[P]>
  }




  export type FollowGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FollowWhereInput
    orderBy?: FollowOrderByWithAggregationInput | FollowOrderByWithAggregationInput[]
    by: FollowScalarFieldEnum[] | FollowScalarFieldEnum
    having?: FollowScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FollowCountAggregateInputType | true
    _min?: FollowMinAggregateInputType
    _max?: FollowMaxAggregateInputType
  }

  export type FollowGroupByOutputType = {
    followId: string
    userId: string
    entityType: $Enums.FollowEntityType
    followedUserId: string | null
    tagId: string | null
    guildId: string | null
    createdAt: Date
    _count: FollowCountAggregateOutputType | null
    _min: FollowMinAggregateOutputType | null
    _max: FollowMaxAggregateOutputType | null
  }

  type GetFollowGroupByPayload<T extends FollowGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FollowGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FollowGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FollowGroupByOutputType[P]>
            : GetScalarType<T[P], FollowGroupByOutputType[P]>
        }
      >
    >


  export type FollowSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    followId?: boolean
    userId?: boolean
    entityType?: boolean
    followedUserId?: boolean
    tagId?: boolean
    guildId?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    followedUser?: boolean | Follow$followedUserArgs<ExtArgs>
    tag?: boolean | Follow$tagArgs<ExtArgs>
    guild?: boolean | Follow$guildArgs<ExtArgs>
  }, ExtArgs["result"]["follow"]>

  export type FollowSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    followId?: boolean
    userId?: boolean
    entityType?: boolean
    followedUserId?: boolean
    tagId?: boolean
    guildId?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    followedUser?: boolean | Follow$followedUserArgs<ExtArgs>
    tag?: boolean | Follow$tagArgs<ExtArgs>
    guild?: boolean | Follow$guildArgs<ExtArgs>
  }, ExtArgs["result"]["follow"]>

  export type FollowSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    followId?: boolean
    userId?: boolean
    entityType?: boolean
    followedUserId?: boolean
    tagId?: boolean
    guildId?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    followedUser?: boolean | Follow$followedUserArgs<ExtArgs>
    tag?: boolean | Follow$tagArgs<ExtArgs>
    guild?: boolean | Follow$guildArgs<ExtArgs>
  }, ExtArgs["result"]["follow"]>

  export type FollowSelectScalar = {
    followId?: boolean
    userId?: boolean
    entityType?: boolean
    followedUserId?: boolean
    tagId?: boolean
    guildId?: boolean
    createdAt?: boolean
  }

  export type FollowOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"followId" | "userId" | "entityType" | "followedUserId" | "tagId" | "guildId" | "createdAt", ExtArgs["result"]["follow"]>
  export type FollowInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    followedUser?: boolean | Follow$followedUserArgs<ExtArgs>
    tag?: boolean | Follow$tagArgs<ExtArgs>
    guild?: boolean | Follow$guildArgs<ExtArgs>
  }
  export type FollowIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    followedUser?: boolean | Follow$followedUserArgs<ExtArgs>
    tag?: boolean | Follow$tagArgs<ExtArgs>
    guild?: boolean | Follow$guildArgs<ExtArgs>
  }
  export type FollowIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    followedUser?: boolean | Follow$followedUserArgs<ExtArgs>
    tag?: boolean | Follow$tagArgs<ExtArgs>
    guild?: boolean | Follow$guildArgs<ExtArgs>
  }

  export type $FollowPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Follow"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      followedUser: Prisma.$UserPayload<ExtArgs> | null
      tag: Prisma.$TagPayload<ExtArgs> | null
      guild: Prisma.$GuildPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      followId: string
      userId: string
      entityType: $Enums.FollowEntityType
      followedUserId: string | null
      tagId: string | null
      guildId: string | null
      createdAt: Date
    }, ExtArgs["result"]["follow"]>
    composites: {}
  }

  type FollowGetPayload<S extends boolean | null | undefined | FollowDefaultArgs> = $Result.GetResult<Prisma.$FollowPayload, S>

  type FollowCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FollowFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FollowCountAggregateInputType | true
    }

  export interface FollowDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Follow'], meta: { name: 'Follow' } }
    /**
     * Find zero or one Follow that matches the filter.
     * @param {FollowFindUniqueArgs} args - Arguments to find a Follow
     * @example
     * // Get one Follow
     * const follow = await prisma.follow.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FollowFindUniqueArgs>(args: SelectSubset<T, FollowFindUniqueArgs<ExtArgs>>): Prisma__FollowClient<$Result.GetResult<Prisma.$FollowPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Follow that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FollowFindUniqueOrThrowArgs} args - Arguments to find a Follow
     * @example
     * // Get one Follow
     * const follow = await prisma.follow.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FollowFindUniqueOrThrowArgs>(args: SelectSubset<T, FollowFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FollowClient<$Result.GetResult<Prisma.$FollowPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Follow that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FollowFindFirstArgs} args - Arguments to find a Follow
     * @example
     * // Get one Follow
     * const follow = await prisma.follow.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FollowFindFirstArgs>(args?: SelectSubset<T, FollowFindFirstArgs<ExtArgs>>): Prisma__FollowClient<$Result.GetResult<Prisma.$FollowPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Follow that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FollowFindFirstOrThrowArgs} args - Arguments to find a Follow
     * @example
     * // Get one Follow
     * const follow = await prisma.follow.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FollowFindFirstOrThrowArgs>(args?: SelectSubset<T, FollowFindFirstOrThrowArgs<ExtArgs>>): Prisma__FollowClient<$Result.GetResult<Prisma.$FollowPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Follows that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FollowFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Follows
     * const follows = await prisma.follow.findMany()
     * 
     * // Get first 10 Follows
     * const follows = await prisma.follow.findMany({ take: 10 })
     * 
     * // Only select the `followId`
     * const followWithFollowIdOnly = await prisma.follow.findMany({ select: { followId: true } })
     * 
     */
    findMany<T extends FollowFindManyArgs>(args?: SelectSubset<T, FollowFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FollowPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Follow.
     * @param {FollowCreateArgs} args - Arguments to create a Follow.
     * @example
     * // Create one Follow
     * const Follow = await prisma.follow.create({
     *   data: {
     *     // ... data to create a Follow
     *   }
     * })
     * 
     */
    create<T extends FollowCreateArgs>(args: SelectSubset<T, FollowCreateArgs<ExtArgs>>): Prisma__FollowClient<$Result.GetResult<Prisma.$FollowPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Follows.
     * @param {FollowCreateManyArgs} args - Arguments to create many Follows.
     * @example
     * // Create many Follows
     * const follow = await prisma.follow.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FollowCreateManyArgs>(args?: SelectSubset<T, FollowCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Follows and returns the data saved in the database.
     * @param {FollowCreateManyAndReturnArgs} args - Arguments to create many Follows.
     * @example
     * // Create many Follows
     * const follow = await prisma.follow.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Follows and only return the `followId`
     * const followWithFollowIdOnly = await prisma.follow.createManyAndReturn({
     *   select: { followId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FollowCreateManyAndReturnArgs>(args?: SelectSubset<T, FollowCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FollowPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Follow.
     * @param {FollowDeleteArgs} args - Arguments to delete one Follow.
     * @example
     * // Delete one Follow
     * const Follow = await prisma.follow.delete({
     *   where: {
     *     // ... filter to delete one Follow
     *   }
     * })
     * 
     */
    delete<T extends FollowDeleteArgs>(args: SelectSubset<T, FollowDeleteArgs<ExtArgs>>): Prisma__FollowClient<$Result.GetResult<Prisma.$FollowPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Follow.
     * @param {FollowUpdateArgs} args - Arguments to update one Follow.
     * @example
     * // Update one Follow
     * const follow = await prisma.follow.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FollowUpdateArgs>(args: SelectSubset<T, FollowUpdateArgs<ExtArgs>>): Prisma__FollowClient<$Result.GetResult<Prisma.$FollowPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Follows.
     * @param {FollowDeleteManyArgs} args - Arguments to filter Follows to delete.
     * @example
     * // Delete a few Follows
     * const { count } = await prisma.follow.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FollowDeleteManyArgs>(args?: SelectSubset<T, FollowDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Follows.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FollowUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Follows
     * const follow = await prisma.follow.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FollowUpdateManyArgs>(args: SelectSubset<T, FollowUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Follows and returns the data updated in the database.
     * @param {FollowUpdateManyAndReturnArgs} args - Arguments to update many Follows.
     * @example
     * // Update many Follows
     * const follow = await prisma.follow.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Follows and only return the `followId`
     * const followWithFollowIdOnly = await prisma.follow.updateManyAndReturn({
     *   select: { followId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends FollowUpdateManyAndReturnArgs>(args: SelectSubset<T, FollowUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FollowPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Follow.
     * @param {FollowUpsertArgs} args - Arguments to update or create a Follow.
     * @example
     * // Update or create a Follow
     * const follow = await prisma.follow.upsert({
     *   create: {
     *     // ... data to create a Follow
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Follow we want to update
     *   }
     * })
     */
    upsert<T extends FollowUpsertArgs>(args: SelectSubset<T, FollowUpsertArgs<ExtArgs>>): Prisma__FollowClient<$Result.GetResult<Prisma.$FollowPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Follows.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FollowCountArgs} args - Arguments to filter Follows to count.
     * @example
     * // Count the number of Follows
     * const count = await prisma.follow.count({
     *   where: {
     *     // ... the filter for the Follows we want to count
     *   }
     * })
    **/
    count<T extends FollowCountArgs>(
      args?: Subset<T, FollowCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FollowCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Follow.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FollowAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FollowAggregateArgs>(args: Subset<T, FollowAggregateArgs>): Prisma.PrismaPromise<GetFollowAggregateType<T>>

    /**
     * Group by Follow.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FollowGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FollowGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FollowGroupByArgs['orderBy'] }
        : { orderBy?: FollowGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FollowGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFollowGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Follow model
   */
  readonly fields: FollowFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Follow.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FollowClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    followedUser<T extends Follow$followedUserArgs<ExtArgs> = {}>(args?: Subset<T, Follow$followedUserArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    tag<T extends Follow$tagArgs<ExtArgs> = {}>(args?: Subset<T, Follow$tagArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    guild<T extends Follow$guildArgs<ExtArgs> = {}>(args?: Subset<T, Follow$guildArgs<ExtArgs>>): Prisma__GuildClient<$Result.GetResult<Prisma.$GuildPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Follow model
   */
  interface FollowFieldRefs {
    readonly followId: FieldRef<"Follow", 'String'>
    readonly userId: FieldRef<"Follow", 'String'>
    readonly entityType: FieldRef<"Follow", 'FollowEntityType'>
    readonly followedUserId: FieldRef<"Follow", 'String'>
    readonly tagId: FieldRef<"Follow", 'String'>
    readonly guildId: FieldRef<"Follow", 'String'>
    readonly createdAt: FieldRef<"Follow", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Follow findUnique
   */
  export type FollowFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Follow
     */
    select?: FollowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Follow
     */
    omit?: FollowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FollowInclude<ExtArgs> | null
    /**
     * Filter, which Follow to fetch.
     */
    where: FollowWhereUniqueInput
  }

  /**
   * Follow findUniqueOrThrow
   */
  export type FollowFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Follow
     */
    select?: FollowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Follow
     */
    omit?: FollowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FollowInclude<ExtArgs> | null
    /**
     * Filter, which Follow to fetch.
     */
    where: FollowWhereUniqueInput
  }

  /**
   * Follow findFirst
   */
  export type FollowFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Follow
     */
    select?: FollowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Follow
     */
    omit?: FollowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FollowInclude<ExtArgs> | null
    /**
     * Filter, which Follow to fetch.
     */
    where?: FollowWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Follows to fetch.
     */
    orderBy?: FollowOrderByWithRelationInput | FollowOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Follows.
     */
    cursor?: FollowWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Follows from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Follows.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Follows.
     */
    distinct?: FollowScalarFieldEnum | FollowScalarFieldEnum[]
  }

  /**
   * Follow findFirstOrThrow
   */
  export type FollowFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Follow
     */
    select?: FollowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Follow
     */
    omit?: FollowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FollowInclude<ExtArgs> | null
    /**
     * Filter, which Follow to fetch.
     */
    where?: FollowWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Follows to fetch.
     */
    orderBy?: FollowOrderByWithRelationInput | FollowOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Follows.
     */
    cursor?: FollowWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Follows from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Follows.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Follows.
     */
    distinct?: FollowScalarFieldEnum | FollowScalarFieldEnum[]
  }

  /**
   * Follow findMany
   */
  export type FollowFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Follow
     */
    select?: FollowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Follow
     */
    omit?: FollowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FollowInclude<ExtArgs> | null
    /**
     * Filter, which Follows to fetch.
     */
    where?: FollowWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Follows to fetch.
     */
    orderBy?: FollowOrderByWithRelationInput | FollowOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Follows.
     */
    cursor?: FollowWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Follows from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Follows.
     */
    skip?: number
    distinct?: FollowScalarFieldEnum | FollowScalarFieldEnum[]
  }

  /**
   * Follow create
   */
  export type FollowCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Follow
     */
    select?: FollowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Follow
     */
    omit?: FollowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FollowInclude<ExtArgs> | null
    /**
     * The data needed to create a Follow.
     */
    data: XOR<FollowCreateInput, FollowUncheckedCreateInput>
  }

  /**
   * Follow createMany
   */
  export type FollowCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Follows.
     */
    data: FollowCreateManyInput | FollowCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Follow createManyAndReturn
   */
  export type FollowCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Follow
     */
    select?: FollowSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Follow
     */
    omit?: FollowOmit<ExtArgs> | null
    /**
     * The data used to create many Follows.
     */
    data: FollowCreateManyInput | FollowCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FollowIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Follow update
   */
  export type FollowUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Follow
     */
    select?: FollowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Follow
     */
    omit?: FollowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FollowInclude<ExtArgs> | null
    /**
     * The data needed to update a Follow.
     */
    data: XOR<FollowUpdateInput, FollowUncheckedUpdateInput>
    /**
     * Choose, which Follow to update.
     */
    where: FollowWhereUniqueInput
  }

  /**
   * Follow updateMany
   */
  export type FollowUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Follows.
     */
    data: XOR<FollowUpdateManyMutationInput, FollowUncheckedUpdateManyInput>
    /**
     * Filter which Follows to update
     */
    where?: FollowWhereInput
    /**
     * Limit how many Follows to update.
     */
    limit?: number
  }

  /**
   * Follow updateManyAndReturn
   */
  export type FollowUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Follow
     */
    select?: FollowSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Follow
     */
    omit?: FollowOmit<ExtArgs> | null
    /**
     * The data used to update Follows.
     */
    data: XOR<FollowUpdateManyMutationInput, FollowUncheckedUpdateManyInput>
    /**
     * Filter which Follows to update
     */
    where?: FollowWhereInput
    /**
     * Limit how many Follows to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FollowIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Follow upsert
   */
  export type FollowUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Follow
     */
    select?: FollowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Follow
     */
    omit?: FollowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FollowInclude<ExtArgs> | null
    /**
     * The filter to search for the Follow to update in case it exists.
     */
    where: FollowWhereUniqueInput
    /**
     * In case the Follow found by the `where` argument doesn't exist, create a new Follow with this data.
     */
    create: XOR<FollowCreateInput, FollowUncheckedCreateInput>
    /**
     * In case the Follow was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FollowUpdateInput, FollowUncheckedUpdateInput>
  }

  /**
   * Follow delete
   */
  export type FollowDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Follow
     */
    select?: FollowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Follow
     */
    omit?: FollowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FollowInclude<ExtArgs> | null
    /**
     * Filter which Follow to delete.
     */
    where: FollowWhereUniqueInput
  }

  /**
   * Follow deleteMany
   */
  export type FollowDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Follows to delete
     */
    where?: FollowWhereInput
    /**
     * Limit how many Follows to delete.
     */
    limit?: number
  }

  /**
   * Follow.followedUser
   */
  export type Follow$followedUserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Follow.tag
   */
  export type Follow$tagArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    where?: TagWhereInput
  }

  /**
   * Follow.guild
   */
  export type Follow$guildArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Guild
     */
    select?: GuildSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Guild
     */
    omit?: GuildOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuildInclude<ExtArgs> | null
    where?: GuildWhereInput
  }

  /**
   * Follow without action
   */
  export type FollowDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Follow
     */
    select?: FollowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Follow
     */
    omit?: FollowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FollowInclude<ExtArgs> | null
  }


  /**
   * Model Tag
   */

  export type AggregateTag = {
    _count: TagCountAggregateOutputType | null
    _min: TagMinAggregateOutputType | null
    _max: TagMaxAggregateOutputType | null
  }

  export type TagMinAggregateOutputType = {
    tagId: string | null
    category: string | null
    value: string | null
  }

  export type TagMaxAggregateOutputType = {
    tagId: string | null
    category: string | null
    value: string | null
  }

  export type TagCountAggregateOutputType = {
    tagId: number
    category: number
    value: number
    _all: number
  }


  export type TagMinAggregateInputType = {
    tagId?: true
    category?: true
    value?: true
  }

  export type TagMaxAggregateInputType = {
    tagId?: true
    category?: true
    value?: true
  }

  export type TagCountAggregateInputType = {
    tagId?: true
    category?: true
    value?: true
    _all?: true
  }

  export type TagAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tag to aggregate.
     */
    where?: TagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tags to fetch.
     */
    orderBy?: TagOrderByWithRelationInput | TagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Tags
    **/
    _count?: true | TagCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TagMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TagMaxAggregateInputType
  }

  export type GetTagAggregateType<T extends TagAggregateArgs> = {
        [P in keyof T & keyof AggregateTag]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTag[P]>
      : GetScalarType<T[P], AggregateTag[P]>
  }




  export type TagGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TagWhereInput
    orderBy?: TagOrderByWithAggregationInput | TagOrderByWithAggregationInput[]
    by: TagScalarFieldEnum[] | TagScalarFieldEnum
    having?: TagScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TagCountAggregateInputType | true
    _min?: TagMinAggregateInputType
    _max?: TagMaxAggregateInputType
  }

  export type TagGroupByOutputType = {
    tagId: string
    category: string
    value: string
    _count: TagCountAggregateOutputType | null
    _min: TagMinAggregateOutputType | null
    _max: TagMaxAggregateOutputType | null
  }

  type GetTagGroupByPayload<T extends TagGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TagGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TagGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TagGroupByOutputType[P]>
            : GetScalarType<T[P], TagGroupByOutputType[P]>
        }
      >
    >


  export type TagSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    tagId?: boolean
    category?: boolean
    value?: boolean
    follows?: boolean | Tag$followsArgs<ExtArgs>
    _count?: boolean | TagCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tag"]>

  export type TagSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    tagId?: boolean
    category?: boolean
    value?: boolean
  }, ExtArgs["result"]["tag"]>

  export type TagSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    tagId?: boolean
    category?: boolean
    value?: boolean
  }, ExtArgs["result"]["tag"]>

  export type TagSelectScalar = {
    tagId?: boolean
    category?: boolean
    value?: boolean
  }

  export type TagOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"tagId" | "category" | "value", ExtArgs["result"]["tag"]>
  export type TagInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    follows?: boolean | Tag$followsArgs<ExtArgs>
    _count?: boolean | TagCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TagIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type TagIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $TagPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Tag"
    objects: {
      follows: Prisma.$FollowPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      tagId: string
      category: string
      value: string
    }, ExtArgs["result"]["tag"]>
    composites: {}
  }

  type TagGetPayload<S extends boolean | null | undefined | TagDefaultArgs> = $Result.GetResult<Prisma.$TagPayload, S>

  type TagCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TagFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TagCountAggregateInputType | true
    }

  export interface TagDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Tag'], meta: { name: 'Tag' } }
    /**
     * Find zero or one Tag that matches the filter.
     * @param {TagFindUniqueArgs} args - Arguments to find a Tag
     * @example
     * // Get one Tag
     * const tag = await prisma.tag.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TagFindUniqueArgs>(args: SelectSubset<T, TagFindUniqueArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Tag that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TagFindUniqueOrThrowArgs} args - Arguments to find a Tag
     * @example
     * // Get one Tag
     * const tag = await prisma.tag.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TagFindUniqueOrThrowArgs>(args: SelectSubset<T, TagFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tag that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagFindFirstArgs} args - Arguments to find a Tag
     * @example
     * // Get one Tag
     * const tag = await prisma.tag.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TagFindFirstArgs>(args?: SelectSubset<T, TagFindFirstArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tag that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagFindFirstOrThrowArgs} args - Arguments to find a Tag
     * @example
     * // Get one Tag
     * const tag = await prisma.tag.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TagFindFirstOrThrowArgs>(args?: SelectSubset<T, TagFindFirstOrThrowArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Tags that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tags
     * const tags = await prisma.tag.findMany()
     * 
     * // Get first 10 Tags
     * const tags = await prisma.tag.findMany({ take: 10 })
     * 
     * // Only select the `tagId`
     * const tagWithTagIdOnly = await prisma.tag.findMany({ select: { tagId: true } })
     * 
     */
    findMany<T extends TagFindManyArgs>(args?: SelectSubset<T, TagFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Tag.
     * @param {TagCreateArgs} args - Arguments to create a Tag.
     * @example
     * // Create one Tag
     * const Tag = await prisma.tag.create({
     *   data: {
     *     // ... data to create a Tag
     *   }
     * })
     * 
     */
    create<T extends TagCreateArgs>(args: SelectSubset<T, TagCreateArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Tags.
     * @param {TagCreateManyArgs} args - Arguments to create many Tags.
     * @example
     * // Create many Tags
     * const tag = await prisma.tag.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TagCreateManyArgs>(args?: SelectSubset<T, TagCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Tags and returns the data saved in the database.
     * @param {TagCreateManyAndReturnArgs} args - Arguments to create many Tags.
     * @example
     * // Create many Tags
     * const tag = await prisma.tag.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Tags and only return the `tagId`
     * const tagWithTagIdOnly = await prisma.tag.createManyAndReturn({
     *   select: { tagId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TagCreateManyAndReturnArgs>(args?: SelectSubset<T, TagCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Tag.
     * @param {TagDeleteArgs} args - Arguments to delete one Tag.
     * @example
     * // Delete one Tag
     * const Tag = await prisma.tag.delete({
     *   where: {
     *     // ... filter to delete one Tag
     *   }
     * })
     * 
     */
    delete<T extends TagDeleteArgs>(args: SelectSubset<T, TagDeleteArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Tag.
     * @param {TagUpdateArgs} args - Arguments to update one Tag.
     * @example
     * // Update one Tag
     * const tag = await prisma.tag.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TagUpdateArgs>(args: SelectSubset<T, TagUpdateArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Tags.
     * @param {TagDeleteManyArgs} args - Arguments to filter Tags to delete.
     * @example
     * // Delete a few Tags
     * const { count } = await prisma.tag.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TagDeleteManyArgs>(args?: SelectSubset<T, TagDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tags
     * const tag = await prisma.tag.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TagUpdateManyArgs>(args: SelectSubset<T, TagUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tags and returns the data updated in the database.
     * @param {TagUpdateManyAndReturnArgs} args - Arguments to update many Tags.
     * @example
     * // Update many Tags
     * const tag = await prisma.tag.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Tags and only return the `tagId`
     * const tagWithTagIdOnly = await prisma.tag.updateManyAndReturn({
     *   select: { tagId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TagUpdateManyAndReturnArgs>(args: SelectSubset<T, TagUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Tag.
     * @param {TagUpsertArgs} args - Arguments to update or create a Tag.
     * @example
     * // Update or create a Tag
     * const tag = await prisma.tag.upsert({
     *   create: {
     *     // ... data to create a Tag
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Tag we want to update
     *   }
     * })
     */
    upsert<T extends TagUpsertArgs>(args: SelectSubset<T, TagUpsertArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Tags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagCountArgs} args - Arguments to filter Tags to count.
     * @example
     * // Count the number of Tags
     * const count = await prisma.tag.count({
     *   where: {
     *     // ... the filter for the Tags we want to count
     *   }
     * })
    **/
    count<T extends TagCountArgs>(
      args?: Subset<T, TagCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TagCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Tag.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TagAggregateArgs>(args: Subset<T, TagAggregateArgs>): Prisma.PrismaPromise<GetTagAggregateType<T>>

    /**
     * Group by Tag.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TagGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TagGroupByArgs['orderBy'] }
        : { orderBy?: TagGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TagGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTagGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Tag model
   */
  readonly fields: TagFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Tag.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TagClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    follows<T extends Tag$followsArgs<ExtArgs> = {}>(args?: Subset<T, Tag$followsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FollowPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Tag model
   */
  interface TagFieldRefs {
    readonly tagId: FieldRef<"Tag", 'String'>
    readonly category: FieldRef<"Tag", 'String'>
    readonly value: FieldRef<"Tag", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Tag findUnique
   */
  export type TagFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * Filter, which Tag to fetch.
     */
    where: TagWhereUniqueInput
  }

  /**
   * Tag findUniqueOrThrow
   */
  export type TagFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * Filter, which Tag to fetch.
     */
    where: TagWhereUniqueInput
  }

  /**
   * Tag findFirst
   */
  export type TagFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * Filter, which Tag to fetch.
     */
    where?: TagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tags to fetch.
     */
    orderBy?: TagOrderByWithRelationInput | TagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tags.
     */
    cursor?: TagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tags.
     */
    distinct?: TagScalarFieldEnum | TagScalarFieldEnum[]
  }

  /**
   * Tag findFirstOrThrow
   */
  export type TagFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * Filter, which Tag to fetch.
     */
    where?: TagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tags to fetch.
     */
    orderBy?: TagOrderByWithRelationInput | TagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tags.
     */
    cursor?: TagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tags.
     */
    distinct?: TagScalarFieldEnum | TagScalarFieldEnum[]
  }

  /**
   * Tag findMany
   */
  export type TagFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * Filter, which Tags to fetch.
     */
    where?: TagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tags to fetch.
     */
    orderBy?: TagOrderByWithRelationInput | TagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Tags.
     */
    cursor?: TagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tags.
     */
    skip?: number
    distinct?: TagScalarFieldEnum | TagScalarFieldEnum[]
  }

  /**
   * Tag create
   */
  export type TagCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * The data needed to create a Tag.
     */
    data: XOR<TagCreateInput, TagUncheckedCreateInput>
  }

  /**
   * Tag createMany
   */
  export type TagCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Tags.
     */
    data: TagCreateManyInput | TagCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Tag createManyAndReturn
   */
  export type TagCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * The data used to create many Tags.
     */
    data: TagCreateManyInput | TagCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Tag update
   */
  export type TagUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * The data needed to update a Tag.
     */
    data: XOR<TagUpdateInput, TagUncheckedUpdateInput>
    /**
     * Choose, which Tag to update.
     */
    where: TagWhereUniqueInput
  }

  /**
   * Tag updateMany
   */
  export type TagUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Tags.
     */
    data: XOR<TagUpdateManyMutationInput, TagUncheckedUpdateManyInput>
    /**
     * Filter which Tags to update
     */
    where?: TagWhereInput
    /**
     * Limit how many Tags to update.
     */
    limit?: number
  }

  /**
   * Tag updateManyAndReturn
   */
  export type TagUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * The data used to update Tags.
     */
    data: XOR<TagUpdateManyMutationInput, TagUncheckedUpdateManyInput>
    /**
     * Filter which Tags to update
     */
    where?: TagWhereInput
    /**
     * Limit how many Tags to update.
     */
    limit?: number
  }

  /**
   * Tag upsert
   */
  export type TagUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * The filter to search for the Tag to update in case it exists.
     */
    where: TagWhereUniqueInput
    /**
     * In case the Tag found by the `where` argument doesn't exist, create a new Tag with this data.
     */
    create: XOR<TagCreateInput, TagUncheckedCreateInput>
    /**
     * In case the Tag was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TagUpdateInput, TagUncheckedUpdateInput>
  }

  /**
   * Tag delete
   */
  export type TagDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * Filter which Tag to delete.
     */
    where: TagWhereUniqueInput
  }

  /**
   * Tag deleteMany
   */
  export type TagDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tags to delete
     */
    where?: TagWhereInput
    /**
     * Limit how many Tags to delete.
     */
    limit?: number
  }

  /**
   * Tag.follows
   */
  export type Tag$followsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Follow
     */
    select?: FollowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Follow
     */
    omit?: FollowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FollowInclude<ExtArgs> | null
    where?: FollowWhereInput
    orderBy?: FollowOrderByWithRelationInput | FollowOrderByWithRelationInput[]
    cursor?: FollowWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FollowScalarFieldEnum | FollowScalarFieldEnum[]
  }

  /**
   * Tag without action
   */
  export type TagDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
  }


  /**
   * Model Guild
   */

  export type AggregateGuild = {
    _count: GuildCountAggregateOutputType | null
    _min: GuildMinAggregateOutputType | null
    _max: GuildMaxAggregateOutputType | null
  }

  export type GuildMinAggregateOutputType = {
    guildId: string | null
    name: string | null
    guildType: $Enums.GuildType | null
    createdAt: Date | null
    createdById: string | null
    currentOwnerId: string | null
    actId: string | null
    venueId: string | null
    clubId: string | null
  }

  export type GuildMaxAggregateOutputType = {
    guildId: string | null
    name: string | null
    guildType: $Enums.GuildType | null
    createdAt: Date | null
    createdById: string | null
    currentOwnerId: string | null
    actId: string | null
    venueId: string | null
    clubId: string | null
  }

  export type GuildCountAggregateOutputType = {
    guildId: number
    name: number
    guildType: number
    createdAt: number
    createdById: number
    currentOwnerId: number
    actId: number
    venueId: number
    clubId: number
    _all: number
  }


  export type GuildMinAggregateInputType = {
    guildId?: true
    name?: true
    guildType?: true
    createdAt?: true
    createdById?: true
    currentOwnerId?: true
    actId?: true
    venueId?: true
    clubId?: true
  }

  export type GuildMaxAggregateInputType = {
    guildId?: true
    name?: true
    guildType?: true
    createdAt?: true
    createdById?: true
    currentOwnerId?: true
    actId?: true
    venueId?: true
    clubId?: true
  }

  export type GuildCountAggregateInputType = {
    guildId?: true
    name?: true
    guildType?: true
    createdAt?: true
    createdById?: true
    currentOwnerId?: true
    actId?: true
    venueId?: true
    clubId?: true
    _all?: true
  }

  export type GuildAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Guild to aggregate.
     */
    where?: GuildWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Guilds to fetch.
     */
    orderBy?: GuildOrderByWithRelationInput | GuildOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GuildWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Guilds from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Guilds.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Guilds
    **/
    _count?: true | GuildCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GuildMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GuildMaxAggregateInputType
  }

  export type GetGuildAggregateType<T extends GuildAggregateArgs> = {
        [P in keyof T & keyof AggregateGuild]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGuild[P]>
      : GetScalarType<T[P], AggregateGuild[P]>
  }




  export type GuildGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GuildWhereInput
    orderBy?: GuildOrderByWithAggregationInput | GuildOrderByWithAggregationInput[]
    by: GuildScalarFieldEnum[] | GuildScalarFieldEnum
    having?: GuildScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GuildCountAggregateInputType | true
    _min?: GuildMinAggregateInputType
    _max?: GuildMaxAggregateInputType
  }

  export type GuildGroupByOutputType = {
    guildId: string
    name: string
    guildType: $Enums.GuildType
    createdAt: Date
    createdById: string | null
    currentOwnerId: string
    actId: string | null
    venueId: string | null
    clubId: string | null
    _count: GuildCountAggregateOutputType | null
    _min: GuildMinAggregateOutputType | null
    _max: GuildMaxAggregateOutputType | null
  }

  type GetGuildGroupByPayload<T extends GuildGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GuildGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GuildGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GuildGroupByOutputType[P]>
            : GetScalarType<T[P], GuildGroupByOutputType[P]>
        }
      >
    >


  export type GuildSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    guildId?: boolean
    name?: boolean
    guildType?: boolean
    createdAt?: boolean
    createdById?: boolean
    currentOwnerId?: boolean
    actId?: boolean
    venueId?: boolean
    clubId?: boolean
    createdBy?: boolean | Guild$createdByArgs<ExtArgs>
    currentOwner?: boolean | UserDefaultArgs<ExtArgs>
    members?: boolean | Guild$membersArgs<ExtArgs>
    act?: boolean | Guild$actArgs<ExtArgs>
    venue?: boolean | Guild$venueArgs<ExtArgs>
    club?: boolean | Guild$clubArgs<ExtArgs>
    follows?: boolean | Guild$followsArgs<ExtArgs>
    invitations?: boolean | Guild$invitationsArgs<ExtArgs>
    _count?: boolean | GuildCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["guild"]>

  export type GuildSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    guildId?: boolean
    name?: boolean
    guildType?: boolean
    createdAt?: boolean
    createdById?: boolean
    currentOwnerId?: boolean
    actId?: boolean
    venueId?: boolean
    clubId?: boolean
    createdBy?: boolean | Guild$createdByArgs<ExtArgs>
    currentOwner?: boolean | UserDefaultArgs<ExtArgs>
    act?: boolean | Guild$actArgs<ExtArgs>
    venue?: boolean | Guild$venueArgs<ExtArgs>
    club?: boolean | Guild$clubArgs<ExtArgs>
  }, ExtArgs["result"]["guild"]>

  export type GuildSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    guildId?: boolean
    name?: boolean
    guildType?: boolean
    createdAt?: boolean
    createdById?: boolean
    currentOwnerId?: boolean
    actId?: boolean
    venueId?: boolean
    clubId?: boolean
    createdBy?: boolean | Guild$createdByArgs<ExtArgs>
    currentOwner?: boolean | UserDefaultArgs<ExtArgs>
    act?: boolean | Guild$actArgs<ExtArgs>
    venue?: boolean | Guild$venueArgs<ExtArgs>
    club?: boolean | Guild$clubArgs<ExtArgs>
  }, ExtArgs["result"]["guild"]>

  export type GuildSelectScalar = {
    guildId?: boolean
    name?: boolean
    guildType?: boolean
    createdAt?: boolean
    createdById?: boolean
    currentOwnerId?: boolean
    actId?: boolean
    venueId?: boolean
    clubId?: boolean
  }

  export type GuildOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"guildId" | "name" | "guildType" | "createdAt" | "createdById" | "currentOwnerId" | "actId" | "venueId" | "clubId", ExtArgs["result"]["guild"]>
  export type GuildInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    createdBy?: boolean | Guild$createdByArgs<ExtArgs>
    currentOwner?: boolean | UserDefaultArgs<ExtArgs>
    members?: boolean | Guild$membersArgs<ExtArgs>
    act?: boolean | Guild$actArgs<ExtArgs>
    venue?: boolean | Guild$venueArgs<ExtArgs>
    club?: boolean | Guild$clubArgs<ExtArgs>
    follows?: boolean | Guild$followsArgs<ExtArgs>
    invitations?: boolean | Guild$invitationsArgs<ExtArgs>
    _count?: boolean | GuildCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type GuildIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    createdBy?: boolean | Guild$createdByArgs<ExtArgs>
    currentOwner?: boolean | UserDefaultArgs<ExtArgs>
    act?: boolean | Guild$actArgs<ExtArgs>
    venue?: boolean | Guild$venueArgs<ExtArgs>
    club?: boolean | Guild$clubArgs<ExtArgs>
  }
  export type GuildIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    createdBy?: boolean | Guild$createdByArgs<ExtArgs>
    currentOwner?: boolean | UserDefaultArgs<ExtArgs>
    act?: boolean | Guild$actArgs<ExtArgs>
    venue?: boolean | Guild$venueArgs<ExtArgs>
    club?: boolean | Guild$clubArgs<ExtArgs>
  }

  export type $GuildPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Guild"
    objects: {
      createdBy: Prisma.$UserPayload<ExtArgs> | null
      currentOwner: Prisma.$UserPayload<ExtArgs>
      members: Prisma.$UserPayload<ExtArgs>[]
      act: Prisma.$ActPayload<ExtArgs> | null
      venue: Prisma.$VenuePayload<ExtArgs> | null
      club: Prisma.$ClubPayload<ExtArgs> | null
      follows: Prisma.$FollowPayload<ExtArgs>[]
      invitations: Prisma.$GuildInvitationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      guildId: string
      name: string
      guildType: $Enums.GuildType
      createdAt: Date
      createdById: string | null
      currentOwnerId: string
      actId: string | null
      venueId: string | null
      clubId: string | null
    }, ExtArgs["result"]["guild"]>
    composites: {}
  }

  type GuildGetPayload<S extends boolean | null | undefined | GuildDefaultArgs> = $Result.GetResult<Prisma.$GuildPayload, S>

  type GuildCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<GuildFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: GuildCountAggregateInputType | true
    }

  export interface GuildDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Guild'], meta: { name: 'Guild' } }
    /**
     * Find zero or one Guild that matches the filter.
     * @param {GuildFindUniqueArgs} args - Arguments to find a Guild
     * @example
     * // Get one Guild
     * const guild = await prisma.guild.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GuildFindUniqueArgs>(args: SelectSubset<T, GuildFindUniqueArgs<ExtArgs>>): Prisma__GuildClient<$Result.GetResult<Prisma.$GuildPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Guild that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {GuildFindUniqueOrThrowArgs} args - Arguments to find a Guild
     * @example
     * // Get one Guild
     * const guild = await prisma.guild.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GuildFindUniqueOrThrowArgs>(args: SelectSubset<T, GuildFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GuildClient<$Result.GetResult<Prisma.$GuildPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Guild that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GuildFindFirstArgs} args - Arguments to find a Guild
     * @example
     * // Get one Guild
     * const guild = await prisma.guild.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GuildFindFirstArgs>(args?: SelectSubset<T, GuildFindFirstArgs<ExtArgs>>): Prisma__GuildClient<$Result.GetResult<Prisma.$GuildPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Guild that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GuildFindFirstOrThrowArgs} args - Arguments to find a Guild
     * @example
     * // Get one Guild
     * const guild = await prisma.guild.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GuildFindFirstOrThrowArgs>(args?: SelectSubset<T, GuildFindFirstOrThrowArgs<ExtArgs>>): Prisma__GuildClient<$Result.GetResult<Prisma.$GuildPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Guilds that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GuildFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Guilds
     * const guilds = await prisma.guild.findMany()
     * 
     * // Get first 10 Guilds
     * const guilds = await prisma.guild.findMany({ take: 10 })
     * 
     * // Only select the `guildId`
     * const guildWithGuildIdOnly = await prisma.guild.findMany({ select: { guildId: true } })
     * 
     */
    findMany<T extends GuildFindManyArgs>(args?: SelectSubset<T, GuildFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GuildPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Guild.
     * @param {GuildCreateArgs} args - Arguments to create a Guild.
     * @example
     * // Create one Guild
     * const Guild = await prisma.guild.create({
     *   data: {
     *     // ... data to create a Guild
     *   }
     * })
     * 
     */
    create<T extends GuildCreateArgs>(args: SelectSubset<T, GuildCreateArgs<ExtArgs>>): Prisma__GuildClient<$Result.GetResult<Prisma.$GuildPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Guilds.
     * @param {GuildCreateManyArgs} args - Arguments to create many Guilds.
     * @example
     * // Create many Guilds
     * const guild = await prisma.guild.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GuildCreateManyArgs>(args?: SelectSubset<T, GuildCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Guilds and returns the data saved in the database.
     * @param {GuildCreateManyAndReturnArgs} args - Arguments to create many Guilds.
     * @example
     * // Create many Guilds
     * const guild = await prisma.guild.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Guilds and only return the `guildId`
     * const guildWithGuildIdOnly = await prisma.guild.createManyAndReturn({
     *   select: { guildId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GuildCreateManyAndReturnArgs>(args?: SelectSubset<T, GuildCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GuildPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Guild.
     * @param {GuildDeleteArgs} args - Arguments to delete one Guild.
     * @example
     * // Delete one Guild
     * const Guild = await prisma.guild.delete({
     *   where: {
     *     // ... filter to delete one Guild
     *   }
     * })
     * 
     */
    delete<T extends GuildDeleteArgs>(args: SelectSubset<T, GuildDeleteArgs<ExtArgs>>): Prisma__GuildClient<$Result.GetResult<Prisma.$GuildPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Guild.
     * @param {GuildUpdateArgs} args - Arguments to update one Guild.
     * @example
     * // Update one Guild
     * const guild = await prisma.guild.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GuildUpdateArgs>(args: SelectSubset<T, GuildUpdateArgs<ExtArgs>>): Prisma__GuildClient<$Result.GetResult<Prisma.$GuildPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Guilds.
     * @param {GuildDeleteManyArgs} args - Arguments to filter Guilds to delete.
     * @example
     * // Delete a few Guilds
     * const { count } = await prisma.guild.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GuildDeleteManyArgs>(args?: SelectSubset<T, GuildDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Guilds.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GuildUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Guilds
     * const guild = await prisma.guild.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GuildUpdateManyArgs>(args: SelectSubset<T, GuildUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Guilds and returns the data updated in the database.
     * @param {GuildUpdateManyAndReturnArgs} args - Arguments to update many Guilds.
     * @example
     * // Update many Guilds
     * const guild = await prisma.guild.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Guilds and only return the `guildId`
     * const guildWithGuildIdOnly = await prisma.guild.updateManyAndReturn({
     *   select: { guildId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends GuildUpdateManyAndReturnArgs>(args: SelectSubset<T, GuildUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GuildPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Guild.
     * @param {GuildUpsertArgs} args - Arguments to update or create a Guild.
     * @example
     * // Update or create a Guild
     * const guild = await prisma.guild.upsert({
     *   create: {
     *     // ... data to create a Guild
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Guild we want to update
     *   }
     * })
     */
    upsert<T extends GuildUpsertArgs>(args: SelectSubset<T, GuildUpsertArgs<ExtArgs>>): Prisma__GuildClient<$Result.GetResult<Prisma.$GuildPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Guilds.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GuildCountArgs} args - Arguments to filter Guilds to count.
     * @example
     * // Count the number of Guilds
     * const count = await prisma.guild.count({
     *   where: {
     *     // ... the filter for the Guilds we want to count
     *   }
     * })
    **/
    count<T extends GuildCountArgs>(
      args?: Subset<T, GuildCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GuildCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Guild.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GuildAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GuildAggregateArgs>(args: Subset<T, GuildAggregateArgs>): Prisma.PrismaPromise<GetGuildAggregateType<T>>

    /**
     * Group by Guild.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GuildGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends GuildGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GuildGroupByArgs['orderBy'] }
        : { orderBy?: GuildGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, GuildGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGuildGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Guild model
   */
  readonly fields: GuildFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Guild.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GuildClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    createdBy<T extends Guild$createdByArgs<ExtArgs> = {}>(args?: Subset<T, Guild$createdByArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    currentOwner<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    members<T extends Guild$membersArgs<ExtArgs> = {}>(args?: Subset<T, Guild$membersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    act<T extends Guild$actArgs<ExtArgs> = {}>(args?: Subset<T, Guild$actArgs<ExtArgs>>): Prisma__ActClient<$Result.GetResult<Prisma.$ActPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    venue<T extends Guild$venueArgs<ExtArgs> = {}>(args?: Subset<T, Guild$venueArgs<ExtArgs>>): Prisma__VenueClient<$Result.GetResult<Prisma.$VenuePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    club<T extends Guild$clubArgs<ExtArgs> = {}>(args?: Subset<T, Guild$clubArgs<ExtArgs>>): Prisma__ClubClient<$Result.GetResult<Prisma.$ClubPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    follows<T extends Guild$followsArgs<ExtArgs> = {}>(args?: Subset<T, Guild$followsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FollowPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    invitations<T extends Guild$invitationsArgs<ExtArgs> = {}>(args?: Subset<T, Guild$invitationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GuildInvitationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Guild model
   */
  interface GuildFieldRefs {
    readonly guildId: FieldRef<"Guild", 'String'>
    readonly name: FieldRef<"Guild", 'String'>
    readonly guildType: FieldRef<"Guild", 'GuildType'>
    readonly createdAt: FieldRef<"Guild", 'DateTime'>
    readonly createdById: FieldRef<"Guild", 'String'>
    readonly currentOwnerId: FieldRef<"Guild", 'String'>
    readonly actId: FieldRef<"Guild", 'String'>
    readonly venueId: FieldRef<"Guild", 'String'>
    readonly clubId: FieldRef<"Guild", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Guild findUnique
   */
  export type GuildFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Guild
     */
    select?: GuildSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Guild
     */
    omit?: GuildOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuildInclude<ExtArgs> | null
    /**
     * Filter, which Guild to fetch.
     */
    where: GuildWhereUniqueInput
  }

  /**
   * Guild findUniqueOrThrow
   */
  export type GuildFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Guild
     */
    select?: GuildSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Guild
     */
    omit?: GuildOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuildInclude<ExtArgs> | null
    /**
     * Filter, which Guild to fetch.
     */
    where: GuildWhereUniqueInput
  }

  /**
   * Guild findFirst
   */
  export type GuildFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Guild
     */
    select?: GuildSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Guild
     */
    omit?: GuildOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuildInclude<ExtArgs> | null
    /**
     * Filter, which Guild to fetch.
     */
    where?: GuildWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Guilds to fetch.
     */
    orderBy?: GuildOrderByWithRelationInput | GuildOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Guilds.
     */
    cursor?: GuildWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Guilds from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Guilds.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Guilds.
     */
    distinct?: GuildScalarFieldEnum | GuildScalarFieldEnum[]
  }

  /**
   * Guild findFirstOrThrow
   */
  export type GuildFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Guild
     */
    select?: GuildSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Guild
     */
    omit?: GuildOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuildInclude<ExtArgs> | null
    /**
     * Filter, which Guild to fetch.
     */
    where?: GuildWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Guilds to fetch.
     */
    orderBy?: GuildOrderByWithRelationInput | GuildOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Guilds.
     */
    cursor?: GuildWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Guilds from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Guilds.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Guilds.
     */
    distinct?: GuildScalarFieldEnum | GuildScalarFieldEnum[]
  }

  /**
   * Guild findMany
   */
  export type GuildFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Guild
     */
    select?: GuildSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Guild
     */
    omit?: GuildOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuildInclude<ExtArgs> | null
    /**
     * Filter, which Guilds to fetch.
     */
    where?: GuildWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Guilds to fetch.
     */
    orderBy?: GuildOrderByWithRelationInput | GuildOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Guilds.
     */
    cursor?: GuildWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Guilds from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Guilds.
     */
    skip?: number
    distinct?: GuildScalarFieldEnum | GuildScalarFieldEnum[]
  }

  /**
   * Guild create
   */
  export type GuildCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Guild
     */
    select?: GuildSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Guild
     */
    omit?: GuildOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuildInclude<ExtArgs> | null
    /**
     * The data needed to create a Guild.
     */
    data: XOR<GuildCreateInput, GuildUncheckedCreateInput>
  }

  /**
   * Guild createMany
   */
  export type GuildCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Guilds.
     */
    data: GuildCreateManyInput | GuildCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Guild createManyAndReturn
   */
  export type GuildCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Guild
     */
    select?: GuildSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Guild
     */
    omit?: GuildOmit<ExtArgs> | null
    /**
     * The data used to create many Guilds.
     */
    data: GuildCreateManyInput | GuildCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuildIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Guild update
   */
  export type GuildUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Guild
     */
    select?: GuildSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Guild
     */
    omit?: GuildOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuildInclude<ExtArgs> | null
    /**
     * The data needed to update a Guild.
     */
    data: XOR<GuildUpdateInput, GuildUncheckedUpdateInput>
    /**
     * Choose, which Guild to update.
     */
    where: GuildWhereUniqueInput
  }

  /**
   * Guild updateMany
   */
  export type GuildUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Guilds.
     */
    data: XOR<GuildUpdateManyMutationInput, GuildUncheckedUpdateManyInput>
    /**
     * Filter which Guilds to update
     */
    where?: GuildWhereInput
    /**
     * Limit how many Guilds to update.
     */
    limit?: number
  }

  /**
   * Guild updateManyAndReturn
   */
  export type GuildUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Guild
     */
    select?: GuildSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Guild
     */
    omit?: GuildOmit<ExtArgs> | null
    /**
     * The data used to update Guilds.
     */
    data: XOR<GuildUpdateManyMutationInput, GuildUncheckedUpdateManyInput>
    /**
     * Filter which Guilds to update
     */
    where?: GuildWhereInput
    /**
     * Limit how many Guilds to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuildIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Guild upsert
   */
  export type GuildUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Guild
     */
    select?: GuildSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Guild
     */
    omit?: GuildOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuildInclude<ExtArgs> | null
    /**
     * The filter to search for the Guild to update in case it exists.
     */
    where: GuildWhereUniqueInput
    /**
     * In case the Guild found by the `where` argument doesn't exist, create a new Guild with this data.
     */
    create: XOR<GuildCreateInput, GuildUncheckedCreateInput>
    /**
     * In case the Guild was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GuildUpdateInput, GuildUncheckedUpdateInput>
  }

  /**
   * Guild delete
   */
  export type GuildDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Guild
     */
    select?: GuildSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Guild
     */
    omit?: GuildOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuildInclude<ExtArgs> | null
    /**
     * Filter which Guild to delete.
     */
    where: GuildWhereUniqueInput
  }

  /**
   * Guild deleteMany
   */
  export type GuildDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Guilds to delete
     */
    where?: GuildWhereInput
    /**
     * Limit how many Guilds to delete.
     */
    limit?: number
  }

  /**
   * Guild.createdBy
   */
  export type Guild$createdByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Guild.members
   */
  export type Guild$membersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    cursor?: UserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * Guild.act
   */
  export type Guild$actArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Act
     */
    select?: ActSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Act
     */
    omit?: ActOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActInclude<ExtArgs> | null
    where?: ActWhereInput
  }

  /**
   * Guild.venue
   */
  export type Guild$venueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Venue
     */
    select?: VenueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Venue
     */
    omit?: VenueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VenueInclude<ExtArgs> | null
    where?: VenueWhereInput
  }

  /**
   * Guild.club
   */
  export type Guild$clubArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Club
     */
    select?: ClubSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Club
     */
    omit?: ClubOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClubInclude<ExtArgs> | null
    where?: ClubWhereInput
  }

  /**
   * Guild.follows
   */
  export type Guild$followsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Follow
     */
    select?: FollowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Follow
     */
    omit?: FollowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FollowInclude<ExtArgs> | null
    where?: FollowWhereInput
    orderBy?: FollowOrderByWithRelationInput | FollowOrderByWithRelationInput[]
    cursor?: FollowWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FollowScalarFieldEnum | FollowScalarFieldEnum[]
  }

  /**
   * Guild.invitations
   */
  export type Guild$invitationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GuildInvitation
     */
    select?: GuildInvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GuildInvitation
     */
    omit?: GuildInvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuildInvitationInclude<ExtArgs> | null
    where?: GuildInvitationWhereInput
    orderBy?: GuildInvitationOrderByWithRelationInput | GuildInvitationOrderByWithRelationInput[]
    cursor?: GuildInvitationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: GuildInvitationScalarFieldEnum | GuildInvitationScalarFieldEnum[]
  }

  /**
   * Guild without action
   */
  export type GuildDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Guild
     */
    select?: GuildSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Guild
     */
    omit?: GuildOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuildInclude<ExtArgs> | null
  }


  /**
   * Model Act
   */

  export type AggregateAct = {
    _count: ActCountAggregateOutputType | null
    _min: ActMinAggregateOutputType | null
    _max: ActMaxAggregateOutputType | null
  }

  export type ActMinAggregateOutputType = {
    actId: string | null
    name: string | null
    bio: string | null
    avatar: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ActMaxAggregateOutputType = {
    actId: string | null
    name: string | null
    bio: string | null
    avatar: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ActCountAggregateOutputType = {
    actId: number
    name: number
    bio: number
    avatar: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ActMinAggregateInputType = {
    actId?: true
    name?: true
    bio?: true
    avatar?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ActMaxAggregateInputType = {
    actId?: true
    name?: true
    bio?: true
    avatar?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ActCountAggregateInputType = {
    actId?: true
    name?: true
    bio?: true
    avatar?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ActAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Act to aggregate.
     */
    where?: ActWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Acts to fetch.
     */
    orderBy?: ActOrderByWithRelationInput | ActOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ActWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Acts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Acts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Acts
    **/
    _count?: true | ActCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ActMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ActMaxAggregateInputType
  }

  export type GetActAggregateType<T extends ActAggregateArgs> = {
        [P in keyof T & keyof AggregateAct]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAct[P]>
      : GetScalarType<T[P], AggregateAct[P]>
  }




  export type ActGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ActWhereInput
    orderBy?: ActOrderByWithAggregationInput | ActOrderByWithAggregationInput[]
    by: ActScalarFieldEnum[] | ActScalarFieldEnum
    having?: ActScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ActCountAggregateInputType | true
    _min?: ActMinAggregateInputType
    _max?: ActMaxAggregateInputType
  }

  export type ActGroupByOutputType = {
    actId: string
    name: string
    bio: string | null
    avatar: string | null
    createdAt: Date
    updatedAt: Date
    _count: ActCountAggregateOutputType | null
    _min: ActMinAggregateOutputType | null
    _max: ActMaxAggregateOutputType | null
  }

  type GetActGroupByPayload<T extends ActGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ActGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ActGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ActGroupByOutputType[P]>
            : GetScalarType<T[P], ActGroupByOutputType[P]>
        }
      >
    >


  export type ActSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    actId?: boolean
    name?: boolean
    bio?: boolean
    avatar?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    guild?: boolean | Act$guildArgs<ExtArgs>
    calendarEvents?: boolean | Act$calendarEventsArgs<ExtArgs>
    _count?: boolean | ActCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["act"]>

  export type ActSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    actId?: boolean
    name?: boolean
    bio?: boolean
    avatar?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["act"]>

  export type ActSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    actId?: boolean
    name?: boolean
    bio?: boolean
    avatar?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["act"]>

  export type ActSelectScalar = {
    actId?: boolean
    name?: boolean
    bio?: boolean
    avatar?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ActOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"actId" | "name" | "bio" | "avatar" | "createdAt" | "updatedAt", ExtArgs["result"]["act"]>
  export type ActInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    guild?: boolean | Act$guildArgs<ExtArgs>
    calendarEvents?: boolean | Act$calendarEventsArgs<ExtArgs>
    _count?: boolean | ActCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ActIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ActIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ActPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Act"
    objects: {
      guild: Prisma.$GuildPayload<ExtArgs> | null
      calendarEvents: Prisma.$CalendarEventPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      actId: string
      name: string
      bio: string | null
      avatar: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["act"]>
    composites: {}
  }

  type ActGetPayload<S extends boolean | null | undefined | ActDefaultArgs> = $Result.GetResult<Prisma.$ActPayload, S>

  type ActCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ActFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ActCountAggregateInputType | true
    }

  export interface ActDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Act'], meta: { name: 'Act' } }
    /**
     * Find zero or one Act that matches the filter.
     * @param {ActFindUniqueArgs} args - Arguments to find a Act
     * @example
     * // Get one Act
     * const act = await prisma.act.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ActFindUniqueArgs>(args: SelectSubset<T, ActFindUniqueArgs<ExtArgs>>): Prisma__ActClient<$Result.GetResult<Prisma.$ActPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Act that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ActFindUniqueOrThrowArgs} args - Arguments to find a Act
     * @example
     * // Get one Act
     * const act = await prisma.act.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ActFindUniqueOrThrowArgs>(args: SelectSubset<T, ActFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ActClient<$Result.GetResult<Prisma.$ActPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Act that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActFindFirstArgs} args - Arguments to find a Act
     * @example
     * // Get one Act
     * const act = await prisma.act.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ActFindFirstArgs>(args?: SelectSubset<T, ActFindFirstArgs<ExtArgs>>): Prisma__ActClient<$Result.GetResult<Prisma.$ActPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Act that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActFindFirstOrThrowArgs} args - Arguments to find a Act
     * @example
     * // Get one Act
     * const act = await prisma.act.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ActFindFirstOrThrowArgs>(args?: SelectSubset<T, ActFindFirstOrThrowArgs<ExtArgs>>): Prisma__ActClient<$Result.GetResult<Prisma.$ActPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Acts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Acts
     * const acts = await prisma.act.findMany()
     * 
     * // Get first 10 Acts
     * const acts = await prisma.act.findMany({ take: 10 })
     * 
     * // Only select the `actId`
     * const actWithActIdOnly = await prisma.act.findMany({ select: { actId: true } })
     * 
     */
    findMany<T extends ActFindManyArgs>(args?: SelectSubset<T, ActFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Act.
     * @param {ActCreateArgs} args - Arguments to create a Act.
     * @example
     * // Create one Act
     * const Act = await prisma.act.create({
     *   data: {
     *     // ... data to create a Act
     *   }
     * })
     * 
     */
    create<T extends ActCreateArgs>(args: SelectSubset<T, ActCreateArgs<ExtArgs>>): Prisma__ActClient<$Result.GetResult<Prisma.$ActPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Acts.
     * @param {ActCreateManyArgs} args - Arguments to create many Acts.
     * @example
     * // Create many Acts
     * const act = await prisma.act.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ActCreateManyArgs>(args?: SelectSubset<T, ActCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Acts and returns the data saved in the database.
     * @param {ActCreateManyAndReturnArgs} args - Arguments to create many Acts.
     * @example
     * // Create many Acts
     * const act = await prisma.act.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Acts and only return the `actId`
     * const actWithActIdOnly = await prisma.act.createManyAndReturn({
     *   select: { actId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ActCreateManyAndReturnArgs>(args?: SelectSubset<T, ActCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Act.
     * @param {ActDeleteArgs} args - Arguments to delete one Act.
     * @example
     * // Delete one Act
     * const Act = await prisma.act.delete({
     *   where: {
     *     // ... filter to delete one Act
     *   }
     * })
     * 
     */
    delete<T extends ActDeleteArgs>(args: SelectSubset<T, ActDeleteArgs<ExtArgs>>): Prisma__ActClient<$Result.GetResult<Prisma.$ActPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Act.
     * @param {ActUpdateArgs} args - Arguments to update one Act.
     * @example
     * // Update one Act
     * const act = await prisma.act.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ActUpdateArgs>(args: SelectSubset<T, ActUpdateArgs<ExtArgs>>): Prisma__ActClient<$Result.GetResult<Prisma.$ActPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Acts.
     * @param {ActDeleteManyArgs} args - Arguments to filter Acts to delete.
     * @example
     * // Delete a few Acts
     * const { count } = await prisma.act.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ActDeleteManyArgs>(args?: SelectSubset<T, ActDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Acts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Acts
     * const act = await prisma.act.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ActUpdateManyArgs>(args: SelectSubset<T, ActUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Acts and returns the data updated in the database.
     * @param {ActUpdateManyAndReturnArgs} args - Arguments to update many Acts.
     * @example
     * // Update many Acts
     * const act = await prisma.act.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Acts and only return the `actId`
     * const actWithActIdOnly = await prisma.act.updateManyAndReturn({
     *   select: { actId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ActUpdateManyAndReturnArgs>(args: SelectSubset<T, ActUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Act.
     * @param {ActUpsertArgs} args - Arguments to update or create a Act.
     * @example
     * // Update or create a Act
     * const act = await prisma.act.upsert({
     *   create: {
     *     // ... data to create a Act
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Act we want to update
     *   }
     * })
     */
    upsert<T extends ActUpsertArgs>(args: SelectSubset<T, ActUpsertArgs<ExtArgs>>): Prisma__ActClient<$Result.GetResult<Prisma.$ActPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Acts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActCountArgs} args - Arguments to filter Acts to count.
     * @example
     * // Count the number of Acts
     * const count = await prisma.act.count({
     *   where: {
     *     // ... the filter for the Acts we want to count
     *   }
     * })
    **/
    count<T extends ActCountArgs>(
      args?: Subset<T, ActCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ActCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Act.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ActAggregateArgs>(args: Subset<T, ActAggregateArgs>): Prisma.PrismaPromise<GetActAggregateType<T>>

    /**
     * Group by Act.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ActGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ActGroupByArgs['orderBy'] }
        : { orderBy?: ActGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ActGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetActGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Act model
   */
  readonly fields: ActFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Act.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ActClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    guild<T extends Act$guildArgs<ExtArgs> = {}>(args?: Subset<T, Act$guildArgs<ExtArgs>>): Prisma__GuildClient<$Result.GetResult<Prisma.$GuildPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    calendarEvents<T extends Act$calendarEventsArgs<ExtArgs> = {}>(args?: Subset<T, Act$calendarEventsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CalendarEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Act model
   */
  interface ActFieldRefs {
    readonly actId: FieldRef<"Act", 'String'>
    readonly name: FieldRef<"Act", 'String'>
    readonly bio: FieldRef<"Act", 'String'>
    readonly avatar: FieldRef<"Act", 'String'>
    readonly createdAt: FieldRef<"Act", 'DateTime'>
    readonly updatedAt: FieldRef<"Act", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Act findUnique
   */
  export type ActFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Act
     */
    select?: ActSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Act
     */
    omit?: ActOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActInclude<ExtArgs> | null
    /**
     * Filter, which Act to fetch.
     */
    where: ActWhereUniqueInput
  }

  /**
   * Act findUniqueOrThrow
   */
  export type ActFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Act
     */
    select?: ActSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Act
     */
    omit?: ActOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActInclude<ExtArgs> | null
    /**
     * Filter, which Act to fetch.
     */
    where: ActWhereUniqueInput
  }

  /**
   * Act findFirst
   */
  export type ActFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Act
     */
    select?: ActSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Act
     */
    omit?: ActOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActInclude<ExtArgs> | null
    /**
     * Filter, which Act to fetch.
     */
    where?: ActWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Acts to fetch.
     */
    orderBy?: ActOrderByWithRelationInput | ActOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Acts.
     */
    cursor?: ActWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Acts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Acts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Acts.
     */
    distinct?: ActScalarFieldEnum | ActScalarFieldEnum[]
  }

  /**
   * Act findFirstOrThrow
   */
  export type ActFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Act
     */
    select?: ActSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Act
     */
    omit?: ActOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActInclude<ExtArgs> | null
    /**
     * Filter, which Act to fetch.
     */
    where?: ActWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Acts to fetch.
     */
    orderBy?: ActOrderByWithRelationInput | ActOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Acts.
     */
    cursor?: ActWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Acts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Acts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Acts.
     */
    distinct?: ActScalarFieldEnum | ActScalarFieldEnum[]
  }

  /**
   * Act findMany
   */
  export type ActFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Act
     */
    select?: ActSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Act
     */
    omit?: ActOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActInclude<ExtArgs> | null
    /**
     * Filter, which Acts to fetch.
     */
    where?: ActWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Acts to fetch.
     */
    orderBy?: ActOrderByWithRelationInput | ActOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Acts.
     */
    cursor?: ActWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Acts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Acts.
     */
    skip?: number
    distinct?: ActScalarFieldEnum | ActScalarFieldEnum[]
  }

  /**
   * Act create
   */
  export type ActCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Act
     */
    select?: ActSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Act
     */
    omit?: ActOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActInclude<ExtArgs> | null
    /**
     * The data needed to create a Act.
     */
    data: XOR<ActCreateInput, ActUncheckedCreateInput>
  }

  /**
   * Act createMany
   */
  export type ActCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Acts.
     */
    data: ActCreateManyInput | ActCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Act createManyAndReturn
   */
  export type ActCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Act
     */
    select?: ActSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Act
     */
    omit?: ActOmit<ExtArgs> | null
    /**
     * The data used to create many Acts.
     */
    data: ActCreateManyInput | ActCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Act update
   */
  export type ActUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Act
     */
    select?: ActSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Act
     */
    omit?: ActOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActInclude<ExtArgs> | null
    /**
     * The data needed to update a Act.
     */
    data: XOR<ActUpdateInput, ActUncheckedUpdateInput>
    /**
     * Choose, which Act to update.
     */
    where: ActWhereUniqueInput
  }

  /**
   * Act updateMany
   */
  export type ActUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Acts.
     */
    data: XOR<ActUpdateManyMutationInput, ActUncheckedUpdateManyInput>
    /**
     * Filter which Acts to update
     */
    where?: ActWhereInput
    /**
     * Limit how many Acts to update.
     */
    limit?: number
  }

  /**
   * Act updateManyAndReturn
   */
  export type ActUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Act
     */
    select?: ActSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Act
     */
    omit?: ActOmit<ExtArgs> | null
    /**
     * The data used to update Acts.
     */
    data: XOR<ActUpdateManyMutationInput, ActUncheckedUpdateManyInput>
    /**
     * Filter which Acts to update
     */
    where?: ActWhereInput
    /**
     * Limit how many Acts to update.
     */
    limit?: number
  }

  /**
   * Act upsert
   */
  export type ActUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Act
     */
    select?: ActSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Act
     */
    omit?: ActOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActInclude<ExtArgs> | null
    /**
     * The filter to search for the Act to update in case it exists.
     */
    where: ActWhereUniqueInput
    /**
     * In case the Act found by the `where` argument doesn't exist, create a new Act with this data.
     */
    create: XOR<ActCreateInput, ActUncheckedCreateInput>
    /**
     * In case the Act was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ActUpdateInput, ActUncheckedUpdateInput>
  }

  /**
   * Act delete
   */
  export type ActDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Act
     */
    select?: ActSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Act
     */
    omit?: ActOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActInclude<ExtArgs> | null
    /**
     * Filter which Act to delete.
     */
    where: ActWhereUniqueInput
  }

  /**
   * Act deleteMany
   */
  export type ActDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Acts to delete
     */
    where?: ActWhereInput
    /**
     * Limit how many Acts to delete.
     */
    limit?: number
  }

  /**
   * Act.guild
   */
  export type Act$guildArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Guild
     */
    select?: GuildSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Guild
     */
    omit?: GuildOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuildInclude<ExtArgs> | null
    where?: GuildWhereInput
  }

  /**
   * Act.calendarEvents
   */
  export type Act$calendarEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CalendarEvent
     */
    select?: CalendarEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CalendarEvent
     */
    omit?: CalendarEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CalendarEventInclude<ExtArgs> | null
    where?: CalendarEventWhereInput
    orderBy?: CalendarEventOrderByWithRelationInput | CalendarEventOrderByWithRelationInput[]
    cursor?: CalendarEventWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CalendarEventScalarFieldEnum | CalendarEventScalarFieldEnum[]
  }

  /**
   * Act without action
   */
  export type ActDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Act
     */
    select?: ActSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Act
     */
    omit?: ActOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActInclude<ExtArgs> | null
  }


  /**
   * Model Venue
   */

  export type AggregateVenue = {
    _count: VenueCountAggregateOutputType | null
    _min: VenueMinAggregateOutputType | null
    _max: VenueMaxAggregateOutputType | null
  }

  export type VenueMinAggregateOutputType = {
    venueId: string | null
    name: string | null
    address: string | null
    city: string | null
    state: string | null
    zipCode: string | null
    avatar: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type VenueMaxAggregateOutputType = {
    venueId: string | null
    name: string | null
    address: string | null
    city: string | null
    state: string | null
    zipCode: string | null
    avatar: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type VenueCountAggregateOutputType = {
    venueId: number
    name: number
    address: number
    city: number
    state: number
    zipCode: number
    avatar: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type VenueMinAggregateInputType = {
    venueId?: true
    name?: true
    address?: true
    city?: true
    state?: true
    zipCode?: true
    avatar?: true
    createdAt?: true
    updatedAt?: true
  }

  export type VenueMaxAggregateInputType = {
    venueId?: true
    name?: true
    address?: true
    city?: true
    state?: true
    zipCode?: true
    avatar?: true
    createdAt?: true
    updatedAt?: true
  }

  export type VenueCountAggregateInputType = {
    venueId?: true
    name?: true
    address?: true
    city?: true
    state?: true
    zipCode?: true
    avatar?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type VenueAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Venue to aggregate.
     */
    where?: VenueWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Venues to fetch.
     */
    orderBy?: VenueOrderByWithRelationInput | VenueOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VenueWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Venues from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Venues.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Venues
    **/
    _count?: true | VenueCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VenueMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VenueMaxAggregateInputType
  }

  export type GetVenueAggregateType<T extends VenueAggregateArgs> = {
        [P in keyof T & keyof AggregateVenue]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVenue[P]>
      : GetScalarType<T[P], AggregateVenue[P]>
  }




  export type VenueGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VenueWhereInput
    orderBy?: VenueOrderByWithAggregationInput | VenueOrderByWithAggregationInput[]
    by: VenueScalarFieldEnum[] | VenueScalarFieldEnum
    having?: VenueScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VenueCountAggregateInputType | true
    _min?: VenueMinAggregateInputType
    _max?: VenueMaxAggregateInputType
  }

  export type VenueGroupByOutputType = {
    venueId: string
    name: string
    address: string | null
    city: string | null
    state: string | null
    zipCode: string | null
    avatar: string | null
    createdAt: Date
    updatedAt: Date
    _count: VenueCountAggregateOutputType | null
    _min: VenueMinAggregateOutputType | null
    _max: VenueMaxAggregateOutputType | null
  }

  type GetVenueGroupByPayload<T extends VenueGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VenueGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VenueGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VenueGroupByOutputType[P]>
            : GetScalarType<T[P], VenueGroupByOutputType[P]>
        }
      >
    >


  export type VenueSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    venueId?: boolean
    name?: boolean
    address?: boolean
    city?: boolean
    state?: boolean
    zipCode?: boolean
    avatar?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    guild?: boolean | Venue$guildArgs<ExtArgs>
    calendarEvents?: boolean | Venue$calendarEventsArgs<ExtArgs>
    _count?: boolean | VenueCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["venue"]>

  export type VenueSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    venueId?: boolean
    name?: boolean
    address?: boolean
    city?: boolean
    state?: boolean
    zipCode?: boolean
    avatar?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["venue"]>

  export type VenueSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    venueId?: boolean
    name?: boolean
    address?: boolean
    city?: boolean
    state?: boolean
    zipCode?: boolean
    avatar?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["venue"]>

  export type VenueSelectScalar = {
    venueId?: boolean
    name?: boolean
    address?: boolean
    city?: boolean
    state?: boolean
    zipCode?: boolean
    avatar?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type VenueOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"venueId" | "name" | "address" | "city" | "state" | "zipCode" | "avatar" | "createdAt" | "updatedAt", ExtArgs["result"]["venue"]>
  export type VenueInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    guild?: boolean | Venue$guildArgs<ExtArgs>
    calendarEvents?: boolean | Venue$calendarEventsArgs<ExtArgs>
    _count?: boolean | VenueCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type VenueIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type VenueIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $VenuePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Venue"
    objects: {
      guild: Prisma.$GuildPayload<ExtArgs> | null
      calendarEvents: Prisma.$CalendarEventPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      venueId: string
      name: string
      address: string | null
      city: string | null
      state: string | null
      zipCode: string | null
      avatar: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["venue"]>
    composites: {}
  }

  type VenueGetPayload<S extends boolean | null | undefined | VenueDefaultArgs> = $Result.GetResult<Prisma.$VenuePayload, S>

  type VenueCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VenueFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VenueCountAggregateInputType | true
    }

  export interface VenueDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Venue'], meta: { name: 'Venue' } }
    /**
     * Find zero or one Venue that matches the filter.
     * @param {VenueFindUniqueArgs} args - Arguments to find a Venue
     * @example
     * // Get one Venue
     * const venue = await prisma.venue.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VenueFindUniqueArgs>(args: SelectSubset<T, VenueFindUniqueArgs<ExtArgs>>): Prisma__VenueClient<$Result.GetResult<Prisma.$VenuePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Venue that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VenueFindUniqueOrThrowArgs} args - Arguments to find a Venue
     * @example
     * // Get one Venue
     * const venue = await prisma.venue.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VenueFindUniqueOrThrowArgs>(args: SelectSubset<T, VenueFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VenueClient<$Result.GetResult<Prisma.$VenuePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Venue that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VenueFindFirstArgs} args - Arguments to find a Venue
     * @example
     * // Get one Venue
     * const venue = await prisma.venue.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VenueFindFirstArgs>(args?: SelectSubset<T, VenueFindFirstArgs<ExtArgs>>): Prisma__VenueClient<$Result.GetResult<Prisma.$VenuePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Venue that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VenueFindFirstOrThrowArgs} args - Arguments to find a Venue
     * @example
     * // Get one Venue
     * const venue = await prisma.venue.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VenueFindFirstOrThrowArgs>(args?: SelectSubset<T, VenueFindFirstOrThrowArgs<ExtArgs>>): Prisma__VenueClient<$Result.GetResult<Prisma.$VenuePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Venues that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VenueFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Venues
     * const venues = await prisma.venue.findMany()
     * 
     * // Get first 10 Venues
     * const venues = await prisma.venue.findMany({ take: 10 })
     * 
     * // Only select the `venueId`
     * const venueWithVenueIdOnly = await prisma.venue.findMany({ select: { venueId: true } })
     * 
     */
    findMany<T extends VenueFindManyArgs>(args?: SelectSubset<T, VenueFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VenuePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Venue.
     * @param {VenueCreateArgs} args - Arguments to create a Venue.
     * @example
     * // Create one Venue
     * const Venue = await prisma.venue.create({
     *   data: {
     *     // ... data to create a Venue
     *   }
     * })
     * 
     */
    create<T extends VenueCreateArgs>(args: SelectSubset<T, VenueCreateArgs<ExtArgs>>): Prisma__VenueClient<$Result.GetResult<Prisma.$VenuePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Venues.
     * @param {VenueCreateManyArgs} args - Arguments to create many Venues.
     * @example
     * // Create many Venues
     * const venue = await prisma.venue.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VenueCreateManyArgs>(args?: SelectSubset<T, VenueCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Venues and returns the data saved in the database.
     * @param {VenueCreateManyAndReturnArgs} args - Arguments to create many Venues.
     * @example
     * // Create many Venues
     * const venue = await prisma.venue.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Venues and only return the `venueId`
     * const venueWithVenueIdOnly = await prisma.venue.createManyAndReturn({
     *   select: { venueId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VenueCreateManyAndReturnArgs>(args?: SelectSubset<T, VenueCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VenuePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Venue.
     * @param {VenueDeleteArgs} args - Arguments to delete one Venue.
     * @example
     * // Delete one Venue
     * const Venue = await prisma.venue.delete({
     *   where: {
     *     // ... filter to delete one Venue
     *   }
     * })
     * 
     */
    delete<T extends VenueDeleteArgs>(args: SelectSubset<T, VenueDeleteArgs<ExtArgs>>): Prisma__VenueClient<$Result.GetResult<Prisma.$VenuePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Venue.
     * @param {VenueUpdateArgs} args - Arguments to update one Venue.
     * @example
     * // Update one Venue
     * const venue = await prisma.venue.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VenueUpdateArgs>(args: SelectSubset<T, VenueUpdateArgs<ExtArgs>>): Prisma__VenueClient<$Result.GetResult<Prisma.$VenuePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Venues.
     * @param {VenueDeleteManyArgs} args - Arguments to filter Venues to delete.
     * @example
     * // Delete a few Venues
     * const { count } = await prisma.venue.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VenueDeleteManyArgs>(args?: SelectSubset<T, VenueDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Venues.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VenueUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Venues
     * const venue = await prisma.venue.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VenueUpdateManyArgs>(args: SelectSubset<T, VenueUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Venues and returns the data updated in the database.
     * @param {VenueUpdateManyAndReturnArgs} args - Arguments to update many Venues.
     * @example
     * // Update many Venues
     * const venue = await prisma.venue.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Venues and only return the `venueId`
     * const venueWithVenueIdOnly = await prisma.venue.updateManyAndReturn({
     *   select: { venueId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends VenueUpdateManyAndReturnArgs>(args: SelectSubset<T, VenueUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VenuePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Venue.
     * @param {VenueUpsertArgs} args - Arguments to update or create a Venue.
     * @example
     * // Update or create a Venue
     * const venue = await prisma.venue.upsert({
     *   create: {
     *     // ... data to create a Venue
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Venue we want to update
     *   }
     * })
     */
    upsert<T extends VenueUpsertArgs>(args: SelectSubset<T, VenueUpsertArgs<ExtArgs>>): Prisma__VenueClient<$Result.GetResult<Prisma.$VenuePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Venues.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VenueCountArgs} args - Arguments to filter Venues to count.
     * @example
     * // Count the number of Venues
     * const count = await prisma.venue.count({
     *   where: {
     *     // ... the filter for the Venues we want to count
     *   }
     * })
    **/
    count<T extends VenueCountArgs>(
      args?: Subset<T, VenueCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VenueCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Venue.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VenueAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VenueAggregateArgs>(args: Subset<T, VenueAggregateArgs>): Prisma.PrismaPromise<GetVenueAggregateType<T>>

    /**
     * Group by Venue.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VenueGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VenueGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VenueGroupByArgs['orderBy'] }
        : { orderBy?: VenueGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VenueGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVenueGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Venue model
   */
  readonly fields: VenueFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Venue.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VenueClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    guild<T extends Venue$guildArgs<ExtArgs> = {}>(args?: Subset<T, Venue$guildArgs<ExtArgs>>): Prisma__GuildClient<$Result.GetResult<Prisma.$GuildPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    calendarEvents<T extends Venue$calendarEventsArgs<ExtArgs> = {}>(args?: Subset<T, Venue$calendarEventsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CalendarEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Venue model
   */
  interface VenueFieldRefs {
    readonly venueId: FieldRef<"Venue", 'String'>
    readonly name: FieldRef<"Venue", 'String'>
    readonly address: FieldRef<"Venue", 'String'>
    readonly city: FieldRef<"Venue", 'String'>
    readonly state: FieldRef<"Venue", 'String'>
    readonly zipCode: FieldRef<"Venue", 'String'>
    readonly avatar: FieldRef<"Venue", 'String'>
    readonly createdAt: FieldRef<"Venue", 'DateTime'>
    readonly updatedAt: FieldRef<"Venue", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Venue findUnique
   */
  export type VenueFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Venue
     */
    select?: VenueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Venue
     */
    omit?: VenueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VenueInclude<ExtArgs> | null
    /**
     * Filter, which Venue to fetch.
     */
    where: VenueWhereUniqueInput
  }

  /**
   * Venue findUniqueOrThrow
   */
  export type VenueFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Venue
     */
    select?: VenueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Venue
     */
    omit?: VenueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VenueInclude<ExtArgs> | null
    /**
     * Filter, which Venue to fetch.
     */
    where: VenueWhereUniqueInput
  }

  /**
   * Venue findFirst
   */
  export type VenueFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Venue
     */
    select?: VenueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Venue
     */
    omit?: VenueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VenueInclude<ExtArgs> | null
    /**
     * Filter, which Venue to fetch.
     */
    where?: VenueWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Venues to fetch.
     */
    orderBy?: VenueOrderByWithRelationInput | VenueOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Venues.
     */
    cursor?: VenueWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Venues from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Venues.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Venues.
     */
    distinct?: VenueScalarFieldEnum | VenueScalarFieldEnum[]
  }

  /**
   * Venue findFirstOrThrow
   */
  export type VenueFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Venue
     */
    select?: VenueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Venue
     */
    omit?: VenueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VenueInclude<ExtArgs> | null
    /**
     * Filter, which Venue to fetch.
     */
    where?: VenueWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Venues to fetch.
     */
    orderBy?: VenueOrderByWithRelationInput | VenueOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Venues.
     */
    cursor?: VenueWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Venues from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Venues.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Venues.
     */
    distinct?: VenueScalarFieldEnum | VenueScalarFieldEnum[]
  }

  /**
   * Venue findMany
   */
  export type VenueFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Venue
     */
    select?: VenueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Venue
     */
    omit?: VenueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VenueInclude<ExtArgs> | null
    /**
     * Filter, which Venues to fetch.
     */
    where?: VenueWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Venues to fetch.
     */
    orderBy?: VenueOrderByWithRelationInput | VenueOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Venues.
     */
    cursor?: VenueWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Venues from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Venues.
     */
    skip?: number
    distinct?: VenueScalarFieldEnum | VenueScalarFieldEnum[]
  }

  /**
   * Venue create
   */
  export type VenueCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Venue
     */
    select?: VenueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Venue
     */
    omit?: VenueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VenueInclude<ExtArgs> | null
    /**
     * The data needed to create a Venue.
     */
    data: XOR<VenueCreateInput, VenueUncheckedCreateInput>
  }

  /**
   * Venue createMany
   */
  export type VenueCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Venues.
     */
    data: VenueCreateManyInput | VenueCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Venue createManyAndReturn
   */
  export type VenueCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Venue
     */
    select?: VenueSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Venue
     */
    omit?: VenueOmit<ExtArgs> | null
    /**
     * The data used to create many Venues.
     */
    data: VenueCreateManyInput | VenueCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Venue update
   */
  export type VenueUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Venue
     */
    select?: VenueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Venue
     */
    omit?: VenueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VenueInclude<ExtArgs> | null
    /**
     * The data needed to update a Venue.
     */
    data: XOR<VenueUpdateInput, VenueUncheckedUpdateInput>
    /**
     * Choose, which Venue to update.
     */
    where: VenueWhereUniqueInput
  }

  /**
   * Venue updateMany
   */
  export type VenueUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Venues.
     */
    data: XOR<VenueUpdateManyMutationInput, VenueUncheckedUpdateManyInput>
    /**
     * Filter which Venues to update
     */
    where?: VenueWhereInput
    /**
     * Limit how many Venues to update.
     */
    limit?: number
  }

  /**
   * Venue updateManyAndReturn
   */
  export type VenueUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Venue
     */
    select?: VenueSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Venue
     */
    omit?: VenueOmit<ExtArgs> | null
    /**
     * The data used to update Venues.
     */
    data: XOR<VenueUpdateManyMutationInput, VenueUncheckedUpdateManyInput>
    /**
     * Filter which Venues to update
     */
    where?: VenueWhereInput
    /**
     * Limit how many Venues to update.
     */
    limit?: number
  }

  /**
   * Venue upsert
   */
  export type VenueUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Venue
     */
    select?: VenueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Venue
     */
    omit?: VenueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VenueInclude<ExtArgs> | null
    /**
     * The filter to search for the Venue to update in case it exists.
     */
    where: VenueWhereUniqueInput
    /**
     * In case the Venue found by the `where` argument doesn't exist, create a new Venue with this data.
     */
    create: XOR<VenueCreateInput, VenueUncheckedCreateInput>
    /**
     * In case the Venue was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VenueUpdateInput, VenueUncheckedUpdateInput>
  }

  /**
   * Venue delete
   */
  export type VenueDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Venue
     */
    select?: VenueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Venue
     */
    omit?: VenueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VenueInclude<ExtArgs> | null
    /**
     * Filter which Venue to delete.
     */
    where: VenueWhereUniqueInput
  }

  /**
   * Venue deleteMany
   */
  export type VenueDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Venues to delete
     */
    where?: VenueWhereInput
    /**
     * Limit how many Venues to delete.
     */
    limit?: number
  }

  /**
   * Venue.guild
   */
  export type Venue$guildArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Guild
     */
    select?: GuildSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Guild
     */
    omit?: GuildOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuildInclude<ExtArgs> | null
    where?: GuildWhereInput
  }

  /**
   * Venue.calendarEvents
   */
  export type Venue$calendarEventsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CalendarEvent
     */
    select?: CalendarEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CalendarEvent
     */
    omit?: CalendarEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CalendarEventInclude<ExtArgs> | null
    where?: CalendarEventWhereInput
    orderBy?: CalendarEventOrderByWithRelationInput | CalendarEventOrderByWithRelationInput[]
    cursor?: CalendarEventWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CalendarEventScalarFieldEnum | CalendarEventScalarFieldEnum[]
  }

  /**
   * Venue without action
   */
  export type VenueDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Venue
     */
    select?: VenueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Venue
     */
    omit?: VenueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VenueInclude<ExtArgs> | null
  }


  /**
   * Model Club
   */

  export type AggregateClub = {
    _count: ClubCountAggregateOutputType | null
    _min: ClubMinAggregateOutputType | null
    _max: ClubMaxAggregateOutputType | null
  }

  export type ClubMinAggregateOutputType = {
    clubId: string | null
    name: string | null
    description: string | null
    avatar: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ClubMaxAggregateOutputType = {
    clubId: string | null
    name: string | null
    description: string | null
    avatar: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ClubCountAggregateOutputType = {
    clubId: number
    name: number
    description: number
    avatar: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ClubMinAggregateInputType = {
    clubId?: true
    name?: true
    description?: true
    avatar?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ClubMaxAggregateInputType = {
    clubId?: true
    name?: true
    description?: true
    avatar?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ClubCountAggregateInputType = {
    clubId?: true
    name?: true
    description?: true
    avatar?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ClubAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Club to aggregate.
     */
    where?: ClubWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clubs to fetch.
     */
    orderBy?: ClubOrderByWithRelationInput | ClubOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ClubWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clubs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clubs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Clubs
    **/
    _count?: true | ClubCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ClubMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ClubMaxAggregateInputType
  }

  export type GetClubAggregateType<T extends ClubAggregateArgs> = {
        [P in keyof T & keyof AggregateClub]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateClub[P]>
      : GetScalarType<T[P], AggregateClub[P]>
  }




  export type ClubGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClubWhereInput
    orderBy?: ClubOrderByWithAggregationInput | ClubOrderByWithAggregationInput[]
    by: ClubScalarFieldEnum[] | ClubScalarFieldEnum
    having?: ClubScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ClubCountAggregateInputType | true
    _min?: ClubMinAggregateInputType
    _max?: ClubMaxAggregateInputType
  }

  export type ClubGroupByOutputType = {
    clubId: string
    name: string
    description: string | null
    avatar: string | null
    createdAt: Date
    updatedAt: Date
    _count: ClubCountAggregateOutputType | null
    _min: ClubMinAggregateOutputType | null
    _max: ClubMaxAggregateOutputType | null
  }

  type GetClubGroupByPayload<T extends ClubGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ClubGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ClubGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ClubGroupByOutputType[P]>
            : GetScalarType<T[P], ClubGroupByOutputType[P]>
        }
      >
    >


  export type ClubSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    clubId?: boolean
    name?: boolean
    description?: boolean
    avatar?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    guild?: boolean | Club$guildArgs<ExtArgs>
  }, ExtArgs["result"]["club"]>

  export type ClubSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    clubId?: boolean
    name?: boolean
    description?: boolean
    avatar?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["club"]>

  export type ClubSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    clubId?: boolean
    name?: boolean
    description?: boolean
    avatar?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["club"]>

  export type ClubSelectScalar = {
    clubId?: boolean
    name?: boolean
    description?: boolean
    avatar?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ClubOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"clubId" | "name" | "description" | "avatar" | "createdAt" | "updatedAt", ExtArgs["result"]["club"]>
  export type ClubInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    guild?: boolean | Club$guildArgs<ExtArgs>
  }
  export type ClubIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ClubIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ClubPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Club"
    objects: {
      guild: Prisma.$GuildPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      clubId: string
      name: string
      description: string | null
      avatar: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["club"]>
    composites: {}
  }

  type ClubGetPayload<S extends boolean | null | undefined | ClubDefaultArgs> = $Result.GetResult<Prisma.$ClubPayload, S>

  type ClubCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ClubFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ClubCountAggregateInputType | true
    }

  export interface ClubDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Club'], meta: { name: 'Club' } }
    /**
     * Find zero or one Club that matches the filter.
     * @param {ClubFindUniqueArgs} args - Arguments to find a Club
     * @example
     * // Get one Club
     * const club = await prisma.club.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ClubFindUniqueArgs>(args: SelectSubset<T, ClubFindUniqueArgs<ExtArgs>>): Prisma__ClubClient<$Result.GetResult<Prisma.$ClubPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Club that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ClubFindUniqueOrThrowArgs} args - Arguments to find a Club
     * @example
     * // Get one Club
     * const club = await prisma.club.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ClubFindUniqueOrThrowArgs>(args: SelectSubset<T, ClubFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ClubClient<$Result.GetResult<Prisma.$ClubPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Club that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClubFindFirstArgs} args - Arguments to find a Club
     * @example
     * // Get one Club
     * const club = await prisma.club.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ClubFindFirstArgs>(args?: SelectSubset<T, ClubFindFirstArgs<ExtArgs>>): Prisma__ClubClient<$Result.GetResult<Prisma.$ClubPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Club that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClubFindFirstOrThrowArgs} args - Arguments to find a Club
     * @example
     * // Get one Club
     * const club = await prisma.club.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ClubFindFirstOrThrowArgs>(args?: SelectSubset<T, ClubFindFirstOrThrowArgs<ExtArgs>>): Prisma__ClubClient<$Result.GetResult<Prisma.$ClubPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Clubs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClubFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Clubs
     * const clubs = await prisma.club.findMany()
     * 
     * // Get first 10 Clubs
     * const clubs = await prisma.club.findMany({ take: 10 })
     * 
     * // Only select the `clubId`
     * const clubWithClubIdOnly = await prisma.club.findMany({ select: { clubId: true } })
     * 
     */
    findMany<T extends ClubFindManyArgs>(args?: SelectSubset<T, ClubFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClubPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Club.
     * @param {ClubCreateArgs} args - Arguments to create a Club.
     * @example
     * // Create one Club
     * const Club = await prisma.club.create({
     *   data: {
     *     // ... data to create a Club
     *   }
     * })
     * 
     */
    create<T extends ClubCreateArgs>(args: SelectSubset<T, ClubCreateArgs<ExtArgs>>): Prisma__ClubClient<$Result.GetResult<Prisma.$ClubPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Clubs.
     * @param {ClubCreateManyArgs} args - Arguments to create many Clubs.
     * @example
     * // Create many Clubs
     * const club = await prisma.club.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ClubCreateManyArgs>(args?: SelectSubset<T, ClubCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Clubs and returns the data saved in the database.
     * @param {ClubCreateManyAndReturnArgs} args - Arguments to create many Clubs.
     * @example
     * // Create many Clubs
     * const club = await prisma.club.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Clubs and only return the `clubId`
     * const clubWithClubIdOnly = await prisma.club.createManyAndReturn({
     *   select: { clubId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ClubCreateManyAndReturnArgs>(args?: SelectSubset<T, ClubCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClubPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Club.
     * @param {ClubDeleteArgs} args - Arguments to delete one Club.
     * @example
     * // Delete one Club
     * const Club = await prisma.club.delete({
     *   where: {
     *     // ... filter to delete one Club
     *   }
     * })
     * 
     */
    delete<T extends ClubDeleteArgs>(args: SelectSubset<T, ClubDeleteArgs<ExtArgs>>): Prisma__ClubClient<$Result.GetResult<Prisma.$ClubPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Club.
     * @param {ClubUpdateArgs} args - Arguments to update one Club.
     * @example
     * // Update one Club
     * const club = await prisma.club.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ClubUpdateArgs>(args: SelectSubset<T, ClubUpdateArgs<ExtArgs>>): Prisma__ClubClient<$Result.GetResult<Prisma.$ClubPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Clubs.
     * @param {ClubDeleteManyArgs} args - Arguments to filter Clubs to delete.
     * @example
     * // Delete a few Clubs
     * const { count } = await prisma.club.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ClubDeleteManyArgs>(args?: SelectSubset<T, ClubDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Clubs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClubUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Clubs
     * const club = await prisma.club.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ClubUpdateManyArgs>(args: SelectSubset<T, ClubUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Clubs and returns the data updated in the database.
     * @param {ClubUpdateManyAndReturnArgs} args - Arguments to update many Clubs.
     * @example
     * // Update many Clubs
     * const club = await prisma.club.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Clubs and only return the `clubId`
     * const clubWithClubIdOnly = await prisma.club.updateManyAndReturn({
     *   select: { clubId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ClubUpdateManyAndReturnArgs>(args: SelectSubset<T, ClubUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClubPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Club.
     * @param {ClubUpsertArgs} args - Arguments to update or create a Club.
     * @example
     * // Update or create a Club
     * const club = await prisma.club.upsert({
     *   create: {
     *     // ... data to create a Club
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Club we want to update
     *   }
     * })
     */
    upsert<T extends ClubUpsertArgs>(args: SelectSubset<T, ClubUpsertArgs<ExtArgs>>): Prisma__ClubClient<$Result.GetResult<Prisma.$ClubPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Clubs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClubCountArgs} args - Arguments to filter Clubs to count.
     * @example
     * // Count the number of Clubs
     * const count = await prisma.club.count({
     *   where: {
     *     // ... the filter for the Clubs we want to count
     *   }
     * })
    **/
    count<T extends ClubCountArgs>(
      args?: Subset<T, ClubCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ClubCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Club.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClubAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ClubAggregateArgs>(args: Subset<T, ClubAggregateArgs>): Prisma.PrismaPromise<GetClubAggregateType<T>>

    /**
     * Group by Club.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClubGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ClubGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ClubGroupByArgs['orderBy'] }
        : { orderBy?: ClubGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ClubGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetClubGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Club model
   */
  readonly fields: ClubFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Club.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ClubClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    guild<T extends Club$guildArgs<ExtArgs> = {}>(args?: Subset<T, Club$guildArgs<ExtArgs>>): Prisma__GuildClient<$Result.GetResult<Prisma.$GuildPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Club model
   */
  interface ClubFieldRefs {
    readonly clubId: FieldRef<"Club", 'String'>
    readonly name: FieldRef<"Club", 'String'>
    readonly description: FieldRef<"Club", 'String'>
    readonly avatar: FieldRef<"Club", 'String'>
    readonly createdAt: FieldRef<"Club", 'DateTime'>
    readonly updatedAt: FieldRef<"Club", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Club findUnique
   */
  export type ClubFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Club
     */
    select?: ClubSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Club
     */
    omit?: ClubOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClubInclude<ExtArgs> | null
    /**
     * Filter, which Club to fetch.
     */
    where: ClubWhereUniqueInput
  }

  /**
   * Club findUniqueOrThrow
   */
  export type ClubFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Club
     */
    select?: ClubSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Club
     */
    omit?: ClubOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClubInclude<ExtArgs> | null
    /**
     * Filter, which Club to fetch.
     */
    where: ClubWhereUniqueInput
  }

  /**
   * Club findFirst
   */
  export type ClubFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Club
     */
    select?: ClubSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Club
     */
    omit?: ClubOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClubInclude<ExtArgs> | null
    /**
     * Filter, which Club to fetch.
     */
    where?: ClubWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clubs to fetch.
     */
    orderBy?: ClubOrderByWithRelationInput | ClubOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Clubs.
     */
    cursor?: ClubWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clubs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clubs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Clubs.
     */
    distinct?: ClubScalarFieldEnum | ClubScalarFieldEnum[]
  }

  /**
   * Club findFirstOrThrow
   */
  export type ClubFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Club
     */
    select?: ClubSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Club
     */
    omit?: ClubOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClubInclude<ExtArgs> | null
    /**
     * Filter, which Club to fetch.
     */
    where?: ClubWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clubs to fetch.
     */
    orderBy?: ClubOrderByWithRelationInput | ClubOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Clubs.
     */
    cursor?: ClubWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clubs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clubs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Clubs.
     */
    distinct?: ClubScalarFieldEnum | ClubScalarFieldEnum[]
  }

  /**
   * Club findMany
   */
  export type ClubFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Club
     */
    select?: ClubSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Club
     */
    omit?: ClubOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClubInclude<ExtArgs> | null
    /**
     * Filter, which Clubs to fetch.
     */
    where?: ClubWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clubs to fetch.
     */
    orderBy?: ClubOrderByWithRelationInput | ClubOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Clubs.
     */
    cursor?: ClubWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clubs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clubs.
     */
    skip?: number
    distinct?: ClubScalarFieldEnum | ClubScalarFieldEnum[]
  }

  /**
   * Club create
   */
  export type ClubCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Club
     */
    select?: ClubSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Club
     */
    omit?: ClubOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClubInclude<ExtArgs> | null
    /**
     * The data needed to create a Club.
     */
    data: XOR<ClubCreateInput, ClubUncheckedCreateInput>
  }

  /**
   * Club createMany
   */
  export type ClubCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Clubs.
     */
    data: ClubCreateManyInput | ClubCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Club createManyAndReturn
   */
  export type ClubCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Club
     */
    select?: ClubSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Club
     */
    omit?: ClubOmit<ExtArgs> | null
    /**
     * The data used to create many Clubs.
     */
    data: ClubCreateManyInput | ClubCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Club update
   */
  export type ClubUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Club
     */
    select?: ClubSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Club
     */
    omit?: ClubOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClubInclude<ExtArgs> | null
    /**
     * The data needed to update a Club.
     */
    data: XOR<ClubUpdateInput, ClubUncheckedUpdateInput>
    /**
     * Choose, which Club to update.
     */
    where: ClubWhereUniqueInput
  }

  /**
   * Club updateMany
   */
  export type ClubUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Clubs.
     */
    data: XOR<ClubUpdateManyMutationInput, ClubUncheckedUpdateManyInput>
    /**
     * Filter which Clubs to update
     */
    where?: ClubWhereInput
    /**
     * Limit how many Clubs to update.
     */
    limit?: number
  }

  /**
   * Club updateManyAndReturn
   */
  export type ClubUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Club
     */
    select?: ClubSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Club
     */
    omit?: ClubOmit<ExtArgs> | null
    /**
     * The data used to update Clubs.
     */
    data: XOR<ClubUpdateManyMutationInput, ClubUncheckedUpdateManyInput>
    /**
     * Filter which Clubs to update
     */
    where?: ClubWhereInput
    /**
     * Limit how many Clubs to update.
     */
    limit?: number
  }

  /**
   * Club upsert
   */
  export type ClubUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Club
     */
    select?: ClubSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Club
     */
    omit?: ClubOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClubInclude<ExtArgs> | null
    /**
     * The filter to search for the Club to update in case it exists.
     */
    where: ClubWhereUniqueInput
    /**
     * In case the Club found by the `where` argument doesn't exist, create a new Club with this data.
     */
    create: XOR<ClubCreateInput, ClubUncheckedCreateInput>
    /**
     * In case the Club was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ClubUpdateInput, ClubUncheckedUpdateInput>
  }

  /**
   * Club delete
   */
  export type ClubDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Club
     */
    select?: ClubSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Club
     */
    omit?: ClubOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClubInclude<ExtArgs> | null
    /**
     * Filter which Club to delete.
     */
    where: ClubWhereUniqueInput
  }

  /**
   * Club deleteMany
   */
  export type ClubDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Clubs to delete
     */
    where?: ClubWhereInput
    /**
     * Limit how many Clubs to delete.
     */
    limit?: number
  }

  /**
   * Club.guild
   */
  export type Club$guildArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Guild
     */
    select?: GuildSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Guild
     */
    omit?: GuildOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuildInclude<ExtArgs> | null
    where?: GuildWhereInput
  }

  /**
   * Club without action
   */
  export type ClubDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Club
     */
    select?: ClubSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Club
     */
    omit?: ClubOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClubInclude<ExtArgs> | null
  }


  /**
   * Model CalendarEvent
   */

  export type AggregateCalendarEvent = {
    _count: CalendarEventCountAggregateOutputType | null
    _avg: CalendarEventAvgAggregateOutputType | null
    _sum: CalendarEventSumAggregateOutputType | null
    _min: CalendarEventMinAggregateOutputType | null
    _max: CalendarEventMaxAggregateOutputType | null
  }

  export type CalendarEventAvgAggregateOutputType = {
    duration: number | null
  }

  export type CalendarEventSumAggregateOutputType = {
    duration: number | null
  }

  export type CalendarEventMinAggregateOutputType = {
    eventId: string | null
    title: string | null
    description: string | null
    poster: string | null
    startTime: Date | null
    duration: number | null
    createdAt: Date | null
    updatedAt: Date | null
    venueId: string | null
  }

  export type CalendarEventMaxAggregateOutputType = {
    eventId: string | null
    title: string | null
    description: string | null
    poster: string | null
    startTime: Date | null
    duration: number | null
    createdAt: Date | null
    updatedAt: Date | null
    venueId: string | null
  }

  export type CalendarEventCountAggregateOutputType = {
    eventId: number
    title: number
    description: number
    poster: number
    startTime: number
    duration: number
    createdAt: number
    updatedAt: number
    venueId: number
    _all: number
  }


  export type CalendarEventAvgAggregateInputType = {
    duration?: true
  }

  export type CalendarEventSumAggregateInputType = {
    duration?: true
  }

  export type CalendarEventMinAggregateInputType = {
    eventId?: true
    title?: true
    description?: true
    poster?: true
    startTime?: true
    duration?: true
    createdAt?: true
    updatedAt?: true
    venueId?: true
  }

  export type CalendarEventMaxAggregateInputType = {
    eventId?: true
    title?: true
    description?: true
    poster?: true
    startTime?: true
    duration?: true
    createdAt?: true
    updatedAt?: true
    venueId?: true
  }

  export type CalendarEventCountAggregateInputType = {
    eventId?: true
    title?: true
    description?: true
    poster?: true
    startTime?: true
    duration?: true
    createdAt?: true
    updatedAt?: true
    venueId?: true
    _all?: true
  }

  export type CalendarEventAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CalendarEvent to aggregate.
     */
    where?: CalendarEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CalendarEvents to fetch.
     */
    orderBy?: CalendarEventOrderByWithRelationInput | CalendarEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CalendarEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CalendarEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CalendarEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CalendarEvents
    **/
    _count?: true | CalendarEventCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CalendarEventAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CalendarEventSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CalendarEventMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CalendarEventMaxAggregateInputType
  }

  export type GetCalendarEventAggregateType<T extends CalendarEventAggregateArgs> = {
        [P in keyof T & keyof AggregateCalendarEvent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCalendarEvent[P]>
      : GetScalarType<T[P], AggregateCalendarEvent[P]>
  }




  export type CalendarEventGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CalendarEventWhereInput
    orderBy?: CalendarEventOrderByWithAggregationInput | CalendarEventOrderByWithAggregationInput[]
    by: CalendarEventScalarFieldEnum[] | CalendarEventScalarFieldEnum
    having?: CalendarEventScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CalendarEventCountAggregateInputType | true
    _avg?: CalendarEventAvgAggregateInputType
    _sum?: CalendarEventSumAggregateInputType
    _min?: CalendarEventMinAggregateInputType
    _max?: CalendarEventMaxAggregateInputType
  }

  export type CalendarEventGroupByOutputType = {
    eventId: string
    title: string | null
    description: string | null
    poster: string | null
    startTime: Date
    duration: number
    createdAt: Date
    updatedAt: Date
    venueId: string
    _count: CalendarEventCountAggregateOutputType | null
    _avg: CalendarEventAvgAggregateOutputType | null
    _sum: CalendarEventSumAggregateOutputType | null
    _min: CalendarEventMinAggregateOutputType | null
    _max: CalendarEventMaxAggregateOutputType | null
  }

  type GetCalendarEventGroupByPayload<T extends CalendarEventGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CalendarEventGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CalendarEventGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CalendarEventGroupByOutputType[P]>
            : GetScalarType<T[P], CalendarEventGroupByOutputType[P]>
        }
      >
    >


  export type CalendarEventSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    eventId?: boolean
    title?: boolean
    description?: boolean
    poster?: boolean
    startTime?: boolean
    duration?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    venueId?: boolean
    venue?: boolean | VenueDefaultArgs<ExtArgs>
    acts?: boolean | CalendarEvent$actsArgs<ExtArgs>
    feedActivities?: boolean | CalendarEvent$feedActivitiesArgs<ExtArgs>
    _count?: boolean | CalendarEventCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["calendarEvent"]>

  export type CalendarEventSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    eventId?: boolean
    title?: boolean
    description?: boolean
    poster?: boolean
    startTime?: boolean
    duration?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    venueId?: boolean
    venue?: boolean | VenueDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["calendarEvent"]>

  export type CalendarEventSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    eventId?: boolean
    title?: boolean
    description?: boolean
    poster?: boolean
    startTime?: boolean
    duration?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    venueId?: boolean
    venue?: boolean | VenueDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["calendarEvent"]>

  export type CalendarEventSelectScalar = {
    eventId?: boolean
    title?: boolean
    description?: boolean
    poster?: boolean
    startTime?: boolean
    duration?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    venueId?: boolean
  }

  export type CalendarEventOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"eventId" | "title" | "description" | "poster" | "startTime" | "duration" | "createdAt" | "updatedAt" | "venueId", ExtArgs["result"]["calendarEvent"]>
  export type CalendarEventInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    venue?: boolean | VenueDefaultArgs<ExtArgs>
    acts?: boolean | CalendarEvent$actsArgs<ExtArgs>
    feedActivities?: boolean | CalendarEvent$feedActivitiesArgs<ExtArgs>
    _count?: boolean | CalendarEventCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CalendarEventIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    venue?: boolean | VenueDefaultArgs<ExtArgs>
  }
  export type CalendarEventIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    venue?: boolean | VenueDefaultArgs<ExtArgs>
  }

  export type $CalendarEventPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CalendarEvent"
    objects: {
      venue: Prisma.$VenuePayload<ExtArgs>
      acts: Prisma.$ActPayload<ExtArgs>[]
      feedActivities: Prisma.$FeedActivityPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      eventId: string
      title: string | null
      description: string | null
      poster: string | null
      startTime: Date
      duration: number
      createdAt: Date
      updatedAt: Date
      venueId: string
    }, ExtArgs["result"]["calendarEvent"]>
    composites: {}
  }

  type CalendarEventGetPayload<S extends boolean | null | undefined | CalendarEventDefaultArgs> = $Result.GetResult<Prisma.$CalendarEventPayload, S>

  type CalendarEventCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CalendarEventFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CalendarEventCountAggregateInputType | true
    }

  export interface CalendarEventDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CalendarEvent'], meta: { name: 'CalendarEvent' } }
    /**
     * Find zero or one CalendarEvent that matches the filter.
     * @param {CalendarEventFindUniqueArgs} args - Arguments to find a CalendarEvent
     * @example
     * // Get one CalendarEvent
     * const calendarEvent = await prisma.calendarEvent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CalendarEventFindUniqueArgs>(args: SelectSubset<T, CalendarEventFindUniqueArgs<ExtArgs>>): Prisma__CalendarEventClient<$Result.GetResult<Prisma.$CalendarEventPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CalendarEvent that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CalendarEventFindUniqueOrThrowArgs} args - Arguments to find a CalendarEvent
     * @example
     * // Get one CalendarEvent
     * const calendarEvent = await prisma.calendarEvent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CalendarEventFindUniqueOrThrowArgs>(args: SelectSubset<T, CalendarEventFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CalendarEventClient<$Result.GetResult<Prisma.$CalendarEventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CalendarEvent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CalendarEventFindFirstArgs} args - Arguments to find a CalendarEvent
     * @example
     * // Get one CalendarEvent
     * const calendarEvent = await prisma.calendarEvent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CalendarEventFindFirstArgs>(args?: SelectSubset<T, CalendarEventFindFirstArgs<ExtArgs>>): Prisma__CalendarEventClient<$Result.GetResult<Prisma.$CalendarEventPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CalendarEvent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CalendarEventFindFirstOrThrowArgs} args - Arguments to find a CalendarEvent
     * @example
     * // Get one CalendarEvent
     * const calendarEvent = await prisma.calendarEvent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CalendarEventFindFirstOrThrowArgs>(args?: SelectSubset<T, CalendarEventFindFirstOrThrowArgs<ExtArgs>>): Prisma__CalendarEventClient<$Result.GetResult<Prisma.$CalendarEventPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CalendarEvents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CalendarEventFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CalendarEvents
     * const calendarEvents = await prisma.calendarEvent.findMany()
     * 
     * // Get first 10 CalendarEvents
     * const calendarEvents = await prisma.calendarEvent.findMany({ take: 10 })
     * 
     * // Only select the `eventId`
     * const calendarEventWithEventIdOnly = await prisma.calendarEvent.findMany({ select: { eventId: true } })
     * 
     */
    findMany<T extends CalendarEventFindManyArgs>(args?: SelectSubset<T, CalendarEventFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CalendarEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CalendarEvent.
     * @param {CalendarEventCreateArgs} args - Arguments to create a CalendarEvent.
     * @example
     * // Create one CalendarEvent
     * const CalendarEvent = await prisma.calendarEvent.create({
     *   data: {
     *     // ... data to create a CalendarEvent
     *   }
     * })
     * 
     */
    create<T extends CalendarEventCreateArgs>(args: SelectSubset<T, CalendarEventCreateArgs<ExtArgs>>): Prisma__CalendarEventClient<$Result.GetResult<Prisma.$CalendarEventPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CalendarEvents.
     * @param {CalendarEventCreateManyArgs} args - Arguments to create many CalendarEvents.
     * @example
     * // Create many CalendarEvents
     * const calendarEvent = await prisma.calendarEvent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CalendarEventCreateManyArgs>(args?: SelectSubset<T, CalendarEventCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CalendarEvents and returns the data saved in the database.
     * @param {CalendarEventCreateManyAndReturnArgs} args - Arguments to create many CalendarEvents.
     * @example
     * // Create many CalendarEvents
     * const calendarEvent = await prisma.calendarEvent.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CalendarEvents and only return the `eventId`
     * const calendarEventWithEventIdOnly = await prisma.calendarEvent.createManyAndReturn({
     *   select: { eventId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CalendarEventCreateManyAndReturnArgs>(args?: SelectSubset<T, CalendarEventCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CalendarEventPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CalendarEvent.
     * @param {CalendarEventDeleteArgs} args - Arguments to delete one CalendarEvent.
     * @example
     * // Delete one CalendarEvent
     * const CalendarEvent = await prisma.calendarEvent.delete({
     *   where: {
     *     // ... filter to delete one CalendarEvent
     *   }
     * })
     * 
     */
    delete<T extends CalendarEventDeleteArgs>(args: SelectSubset<T, CalendarEventDeleteArgs<ExtArgs>>): Prisma__CalendarEventClient<$Result.GetResult<Prisma.$CalendarEventPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CalendarEvent.
     * @param {CalendarEventUpdateArgs} args - Arguments to update one CalendarEvent.
     * @example
     * // Update one CalendarEvent
     * const calendarEvent = await prisma.calendarEvent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CalendarEventUpdateArgs>(args: SelectSubset<T, CalendarEventUpdateArgs<ExtArgs>>): Prisma__CalendarEventClient<$Result.GetResult<Prisma.$CalendarEventPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CalendarEvents.
     * @param {CalendarEventDeleteManyArgs} args - Arguments to filter CalendarEvents to delete.
     * @example
     * // Delete a few CalendarEvents
     * const { count } = await prisma.calendarEvent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CalendarEventDeleteManyArgs>(args?: SelectSubset<T, CalendarEventDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CalendarEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CalendarEventUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CalendarEvents
     * const calendarEvent = await prisma.calendarEvent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CalendarEventUpdateManyArgs>(args: SelectSubset<T, CalendarEventUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CalendarEvents and returns the data updated in the database.
     * @param {CalendarEventUpdateManyAndReturnArgs} args - Arguments to update many CalendarEvents.
     * @example
     * // Update many CalendarEvents
     * const calendarEvent = await prisma.calendarEvent.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CalendarEvents and only return the `eventId`
     * const calendarEventWithEventIdOnly = await prisma.calendarEvent.updateManyAndReturn({
     *   select: { eventId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CalendarEventUpdateManyAndReturnArgs>(args: SelectSubset<T, CalendarEventUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CalendarEventPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CalendarEvent.
     * @param {CalendarEventUpsertArgs} args - Arguments to update or create a CalendarEvent.
     * @example
     * // Update or create a CalendarEvent
     * const calendarEvent = await prisma.calendarEvent.upsert({
     *   create: {
     *     // ... data to create a CalendarEvent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CalendarEvent we want to update
     *   }
     * })
     */
    upsert<T extends CalendarEventUpsertArgs>(args: SelectSubset<T, CalendarEventUpsertArgs<ExtArgs>>): Prisma__CalendarEventClient<$Result.GetResult<Prisma.$CalendarEventPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CalendarEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CalendarEventCountArgs} args - Arguments to filter CalendarEvents to count.
     * @example
     * // Count the number of CalendarEvents
     * const count = await prisma.calendarEvent.count({
     *   where: {
     *     // ... the filter for the CalendarEvents we want to count
     *   }
     * })
    **/
    count<T extends CalendarEventCountArgs>(
      args?: Subset<T, CalendarEventCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CalendarEventCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CalendarEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CalendarEventAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CalendarEventAggregateArgs>(args: Subset<T, CalendarEventAggregateArgs>): Prisma.PrismaPromise<GetCalendarEventAggregateType<T>>

    /**
     * Group by CalendarEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CalendarEventGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CalendarEventGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CalendarEventGroupByArgs['orderBy'] }
        : { orderBy?: CalendarEventGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CalendarEventGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCalendarEventGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CalendarEvent model
   */
  readonly fields: CalendarEventFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CalendarEvent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CalendarEventClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    venue<T extends VenueDefaultArgs<ExtArgs> = {}>(args?: Subset<T, VenueDefaultArgs<ExtArgs>>): Prisma__VenueClient<$Result.GetResult<Prisma.$VenuePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    acts<T extends CalendarEvent$actsArgs<ExtArgs> = {}>(args?: Subset<T, CalendarEvent$actsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    feedActivities<T extends CalendarEvent$feedActivitiesArgs<ExtArgs> = {}>(args?: Subset<T, CalendarEvent$feedActivitiesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FeedActivityPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CalendarEvent model
   */
  interface CalendarEventFieldRefs {
    readonly eventId: FieldRef<"CalendarEvent", 'String'>
    readonly title: FieldRef<"CalendarEvent", 'String'>
    readonly description: FieldRef<"CalendarEvent", 'String'>
    readonly poster: FieldRef<"CalendarEvent", 'String'>
    readonly startTime: FieldRef<"CalendarEvent", 'DateTime'>
    readonly duration: FieldRef<"CalendarEvent", 'Int'>
    readonly createdAt: FieldRef<"CalendarEvent", 'DateTime'>
    readonly updatedAt: FieldRef<"CalendarEvent", 'DateTime'>
    readonly venueId: FieldRef<"CalendarEvent", 'String'>
  }
    

  // Custom InputTypes
  /**
   * CalendarEvent findUnique
   */
  export type CalendarEventFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CalendarEvent
     */
    select?: CalendarEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CalendarEvent
     */
    omit?: CalendarEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CalendarEventInclude<ExtArgs> | null
    /**
     * Filter, which CalendarEvent to fetch.
     */
    where: CalendarEventWhereUniqueInput
  }

  /**
   * CalendarEvent findUniqueOrThrow
   */
  export type CalendarEventFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CalendarEvent
     */
    select?: CalendarEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CalendarEvent
     */
    omit?: CalendarEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CalendarEventInclude<ExtArgs> | null
    /**
     * Filter, which CalendarEvent to fetch.
     */
    where: CalendarEventWhereUniqueInput
  }

  /**
   * CalendarEvent findFirst
   */
  export type CalendarEventFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CalendarEvent
     */
    select?: CalendarEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CalendarEvent
     */
    omit?: CalendarEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CalendarEventInclude<ExtArgs> | null
    /**
     * Filter, which CalendarEvent to fetch.
     */
    where?: CalendarEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CalendarEvents to fetch.
     */
    orderBy?: CalendarEventOrderByWithRelationInput | CalendarEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CalendarEvents.
     */
    cursor?: CalendarEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CalendarEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CalendarEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CalendarEvents.
     */
    distinct?: CalendarEventScalarFieldEnum | CalendarEventScalarFieldEnum[]
  }

  /**
   * CalendarEvent findFirstOrThrow
   */
  export type CalendarEventFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CalendarEvent
     */
    select?: CalendarEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CalendarEvent
     */
    omit?: CalendarEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CalendarEventInclude<ExtArgs> | null
    /**
     * Filter, which CalendarEvent to fetch.
     */
    where?: CalendarEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CalendarEvents to fetch.
     */
    orderBy?: CalendarEventOrderByWithRelationInput | CalendarEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CalendarEvents.
     */
    cursor?: CalendarEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CalendarEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CalendarEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CalendarEvents.
     */
    distinct?: CalendarEventScalarFieldEnum | CalendarEventScalarFieldEnum[]
  }

  /**
   * CalendarEvent findMany
   */
  export type CalendarEventFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CalendarEvent
     */
    select?: CalendarEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CalendarEvent
     */
    omit?: CalendarEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CalendarEventInclude<ExtArgs> | null
    /**
     * Filter, which CalendarEvents to fetch.
     */
    where?: CalendarEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CalendarEvents to fetch.
     */
    orderBy?: CalendarEventOrderByWithRelationInput | CalendarEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CalendarEvents.
     */
    cursor?: CalendarEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CalendarEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CalendarEvents.
     */
    skip?: number
    distinct?: CalendarEventScalarFieldEnum | CalendarEventScalarFieldEnum[]
  }

  /**
   * CalendarEvent create
   */
  export type CalendarEventCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CalendarEvent
     */
    select?: CalendarEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CalendarEvent
     */
    omit?: CalendarEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CalendarEventInclude<ExtArgs> | null
    /**
     * The data needed to create a CalendarEvent.
     */
    data: XOR<CalendarEventCreateInput, CalendarEventUncheckedCreateInput>
  }

  /**
   * CalendarEvent createMany
   */
  export type CalendarEventCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CalendarEvents.
     */
    data: CalendarEventCreateManyInput | CalendarEventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CalendarEvent createManyAndReturn
   */
  export type CalendarEventCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CalendarEvent
     */
    select?: CalendarEventSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CalendarEvent
     */
    omit?: CalendarEventOmit<ExtArgs> | null
    /**
     * The data used to create many CalendarEvents.
     */
    data: CalendarEventCreateManyInput | CalendarEventCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CalendarEventIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CalendarEvent update
   */
  export type CalendarEventUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CalendarEvent
     */
    select?: CalendarEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CalendarEvent
     */
    omit?: CalendarEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CalendarEventInclude<ExtArgs> | null
    /**
     * The data needed to update a CalendarEvent.
     */
    data: XOR<CalendarEventUpdateInput, CalendarEventUncheckedUpdateInput>
    /**
     * Choose, which CalendarEvent to update.
     */
    where: CalendarEventWhereUniqueInput
  }

  /**
   * CalendarEvent updateMany
   */
  export type CalendarEventUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CalendarEvents.
     */
    data: XOR<CalendarEventUpdateManyMutationInput, CalendarEventUncheckedUpdateManyInput>
    /**
     * Filter which CalendarEvents to update
     */
    where?: CalendarEventWhereInput
    /**
     * Limit how many CalendarEvents to update.
     */
    limit?: number
  }

  /**
   * CalendarEvent updateManyAndReturn
   */
  export type CalendarEventUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CalendarEvent
     */
    select?: CalendarEventSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CalendarEvent
     */
    omit?: CalendarEventOmit<ExtArgs> | null
    /**
     * The data used to update CalendarEvents.
     */
    data: XOR<CalendarEventUpdateManyMutationInput, CalendarEventUncheckedUpdateManyInput>
    /**
     * Filter which CalendarEvents to update
     */
    where?: CalendarEventWhereInput
    /**
     * Limit how many CalendarEvents to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CalendarEventIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * CalendarEvent upsert
   */
  export type CalendarEventUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CalendarEvent
     */
    select?: CalendarEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CalendarEvent
     */
    omit?: CalendarEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CalendarEventInclude<ExtArgs> | null
    /**
     * The filter to search for the CalendarEvent to update in case it exists.
     */
    where: CalendarEventWhereUniqueInput
    /**
     * In case the CalendarEvent found by the `where` argument doesn't exist, create a new CalendarEvent with this data.
     */
    create: XOR<CalendarEventCreateInput, CalendarEventUncheckedCreateInput>
    /**
     * In case the CalendarEvent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CalendarEventUpdateInput, CalendarEventUncheckedUpdateInput>
  }

  /**
   * CalendarEvent delete
   */
  export type CalendarEventDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CalendarEvent
     */
    select?: CalendarEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CalendarEvent
     */
    omit?: CalendarEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CalendarEventInclude<ExtArgs> | null
    /**
     * Filter which CalendarEvent to delete.
     */
    where: CalendarEventWhereUniqueInput
  }

  /**
   * CalendarEvent deleteMany
   */
  export type CalendarEventDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CalendarEvents to delete
     */
    where?: CalendarEventWhereInput
    /**
     * Limit how many CalendarEvents to delete.
     */
    limit?: number
  }

  /**
   * CalendarEvent.acts
   */
  export type CalendarEvent$actsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Act
     */
    select?: ActSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Act
     */
    omit?: ActOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActInclude<ExtArgs> | null
    where?: ActWhereInput
    orderBy?: ActOrderByWithRelationInput | ActOrderByWithRelationInput[]
    cursor?: ActWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ActScalarFieldEnum | ActScalarFieldEnum[]
  }

  /**
   * CalendarEvent.feedActivities
   */
  export type CalendarEvent$feedActivitiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeedActivity
     */
    select?: FeedActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the FeedActivity
     */
    omit?: FeedActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedActivityInclude<ExtArgs> | null
    where?: FeedActivityWhereInput
    orderBy?: FeedActivityOrderByWithRelationInput | FeedActivityOrderByWithRelationInput[]
    cursor?: FeedActivityWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FeedActivityScalarFieldEnum | FeedActivityScalarFieldEnum[]
  }

  /**
   * CalendarEvent without action
   */
  export type CalendarEventDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CalendarEvent
     */
    select?: CalendarEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CalendarEvent
     */
    omit?: CalendarEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CalendarEventInclude<ExtArgs> | null
  }


  /**
   * Model FeedActivity
   */

  export type AggregateFeedActivity = {
    _count: FeedActivityCountAggregateOutputType | null
    _min: FeedActivityMinAggregateOutputType | null
    _max: FeedActivityMaxAggregateOutputType | null
  }

  export type FeedActivityMinAggregateOutputType = {
    activityId: string | null
    activityType: string | null
    createdAt: Date | null
    subjectType: string | null
    subjectId: string | null
    calendarEventId: string | null
    userId: string | null
  }

  export type FeedActivityMaxAggregateOutputType = {
    activityId: string | null
    activityType: string | null
    createdAt: Date | null
    subjectType: string | null
    subjectId: string | null
    calendarEventId: string | null
    userId: string | null
  }

  export type FeedActivityCountAggregateOutputType = {
    activityId: number
    activityType: number
    createdAt: number
    subjectType: number
    subjectId: number
    calendarEventId: number
    userId: number
    _all: number
  }


  export type FeedActivityMinAggregateInputType = {
    activityId?: true
    activityType?: true
    createdAt?: true
    subjectType?: true
    subjectId?: true
    calendarEventId?: true
    userId?: true
  }

  export type FeedActivityMaxAggregateInputType = {
    activityId?: true
    activityType?: true
    createdAt?: true
    subjectType?: true
    subjectId?: true
    calendarEventId?: true
    userId?: true
  }

  export type FeedActivityCountAggregateInputType = {
    activityId?: true
    activityType?: true
    createdAt?: true
    subjectType?: true
    subjectId?: true
    calendarEventId?: true
    userId?: true
    _all?: true
  }

  export type FeedActivityAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FeedActivity to aggregate.
     */
    where?: FeedActivityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FeedActivities to fetch.
     */
    orderBy?: FeedActivityOrderByWithRelationInput | FeedActivityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FeedActivityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FeedActivities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FeedActivities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned FeedActivities
    **/
    _count?: true | FeedActivityCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FeedActivityMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FeedActivityMaxAggregateInputType
  }

  export type GetFeedActivityAggregateType<T extends FeedActivityAggregateArgs> = {
        [P in keyof T & keyof AggregateFeedActivity]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFeedActivity[P]>
      : GetScalarType<T[P], AggregateFeedActivity[P]>
  }




  export type FeedActivityGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FeedActivityWhereInput
    orderBy?: FeedActivityOrderByWithAggregationInput | FeedActivityOrderByWithAggregationInput[]
    by: FeedActivityScalarFieldEnum[] | FeedActivityScalarFieldEnum
    having?: FeedActivityScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FeedActivityCountAggregateInputType | true
    _min?: FeedActivityMinAggregateInputType
    _max?: FeedActivityMaxAggregateInputType
  }

  export type FeedActivityGroupByOutputType = {
    activityId: string
    activityType: string
    createdAt: Date
    subjectType: string
    subjectId: string
    calendarEventId: string | null
    userId: string | null
    _count: FeedActivityCountAggregateOutputType | null
    _min: FeedActivityMinAggregateOutputType | null
    _max: FeedActivityMaxAggregateOutputType | null
  }

  type GetFeedActivityGroupByPayload<T extends FeedActivityGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FeedActivityGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FeedActivityGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FeedActivityGroupByOutputType[P]>
            : GetScalarType<T[P], FeedActivityGroupByOutputType[P]>
        }
      >
    >


  export type FeedActivitySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    activityId?: boolean
    activityType?: boolean
    createdAt?: boolean
    subjectType?: boolean
    subjectId?: boolean
    calendarEventId?: boolean
    userId?: boolean
    calendarEvent?: boolean | FeedActivity$calendarEventArgs<ExtArgs>
    user?: boolean | FeedActivity$userArgs<ExtArgs>
  }, ExtArgs["result"]["feedActivity"]>

  export type FeedActivitySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    activityId?: boolean
    activityType?: boolean
    createdAt?: boolean
    subjectType?: boolean
    subjectId?: boolean
    calendarEventId?: boolean
    userId?: boolean
    calendarEvent?: boolean | FeedActivity$calendarEventArgs<ExtArgs>
    user?: boolean | FeedActivity$userArgs<ExtArgs>
  }, ExtArgs["result"]["feedActivity"]>

  export type FeedActivitySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    activityId?: boolean
    activityType?: boolean
    createdAt?: boolean
    subjectType?: boolean
    subjectId?: boolean
    calendarEventId?: boolean
    userId?: boolean
    calendarEvent?: boolean | FeedActivity$calendarEventArgs<ExtArgs>
    user?: boolean | FeedActivity$userArgs<ExtArgs>
  }, ExtArgs["result"]["feedActivity"]>

  export type FeedActivitySelectScalar = {
    activityId?: boolean
    activityType?: boolean
    createdAt?: boolean
    subjectType?: boolean
    subjectId?: boolean
    calendarEventId?: boolean
    userId?: boolean
  }

  export type FeedActivityOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"activityId" | "activityType" | "createdAt" | "subjectType" | "subjectId" | "calendarEventId" | "userId", ExtArgs["result"]["feedActivity"]>
  export type FeedActivityInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    calendarEvent?: boolean | FeedActivity$calendarEventArgs<ExtArgs>
    user?: boolean | FeedActivity$userArgs<ExtArgs>
  }
  export type FeedActivityIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    calendarEvent?: boolean | FeedActivity$calendarEventArgs<ExtArgs>
    user?: boolean | FeedActivity$userArgs<ExtArgs>
  }
  export type FeedActivityIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    calendarEvent?: boolean | FeedActivity$calendarEventArgs<ExtArgs>
    user?: boolean | FeedActivity$userArgs<ExtArgs>
  }

  export type $FeedActivityPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "FeedActivity"
    objects: {
      calendarEvent: Prisma.$CalendarEventPayload<ExtArgs> | null
      user: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      activityId: string
      activityType: string
      createdAt: Date
      subjectType: string
      subjectId: string
      calendarEventId: string | null
      userId: string | null
    }, ExtArgs["result"]["feedActivity"]>
    composites: {}
  }

  type FeedActivityGetPayload<S extends boolean | null | undefined | FeedActivityDefaultArgs> = $Result.GetResult<Prisma.$FeedActivityPayload, S>

  type FeedActivityCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FeedActivityFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FeedActivityCountAggregateInputType | true
    }

  export interface FeedActivityDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['FeedActivity'], meta: { name: 'FeedActivity' } }
    /**
     * Find zero or one FeedActivity that matches the filter.
     * @param {FeedActivityFindUniqueArgs} args - Arguments to find a FeedActivity
     * @example
     * // Get one FeedActivity
     * const feedActivity = await prisma.feedActivity.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FeedActivityFindUniqueArgs>(args: SelectSubset<T, FeedActivityFindUniqueArgs<ExtArgs>>): Prisma__FeedActivityClient<$Result.GetResult<Prisma.$FeedActivityPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one FeedActivity that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FeedActivityFindUniqueOrThrowArgs} args - Arguments to find a FeedActivity
     * @example
     * // Get one FeedActivity
     * const feedActivity = await prisma.feedActivity.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FeedActivityFindUniqueOrThrowArgs>(args: SelectSubset<T, FeedActivityFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FeedActivityClient<$Result.GetResult<Prisma.$FeedActivityPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FeedActivity that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedActivityFindFirstArgs} args - Arguments to find a FeedActivity
     * @example
     * // Get one FeedActivity
     * const feedActivity = await prisma.feedActivity.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FeedActivityFindFirstArgs>(args?: SelectSubset<T, FeedActivityFindFirstArgs<ExtArgs>>): Prisma__FeedActivityClient<$Result.GetResult<Prisma.$FeedActivityPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FeedActivity that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedActivityFindFirstOrThrowArgs} args - Arguments to find a FeedActivity
     * @example
     * // Get one FeedActivity
     * const feedActivity = await prisma.feedActivity.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FeedActivityFindFirstOrThrowArgs>(args?: SelectSubset<T, FeedActivityFindFirstOrThrowArgs<ExtArgs>>): Prisma__FeedActivityClient<$Result.GetResult<Prisma.$FeedActivityPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more FeedActivities that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedActivityFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all FeedActivities
     * const feedActivities = await prisma.feedActivity.findMany()
     * 
     * // Get first 10 FeedActivities
     * const feedActivities = await prisma.feedActivity.findMany({ take: 10 })
     * 
     * // Only select the `activityId`
     * const feedActivityWithActivityIdOnly = await prisma.feedActivity.findMany({ select: { activityId: true } })
     * 
     */
    findMany<T extends FeedActivityFindManyArgs>(args?: SelectSubset<T, FeedActivityFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FeedActivityPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a FeedActivity.
     * @param {FeedActivityCreateArgs} args - Arguments to create a FeedActivity.
     * @example
     * // Create one FeedActivity
     * const FeedActivity = await prisma.feedActivity.create({
     *   data: {
     *     // ... data to create a FeedActivity
     *   }
     * })
     * 
     */
    create<T extends FeedActivityCreateArgs>(args: SelectSubset<T, FeedActivityCreateArgs<ExtArgs>>): Prisma__FeedActivityClient<$Result.GetResult<Prisma.$FeedActivityPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many FeedActivities.
     * @param {FeedActivityCreateManyArgs} args - Arguments to create many FeedActivities.
     * @example
     * // Create many FeedActivities
     * const feedActivity = await prisma.feedActivity.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FeedActivityCreateManyArgs>(args?: SelectSubset<T, FeedActivityCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many FeedActivities and returns the data saved in the database.
     * @param {FeedActivityCreateManyAndReturnArgs} args - Arguments to create many FeedActivities.
     * @example
     * // Create many FeedActivities
     * const feedActivity = await prisma.feedActivity.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many FeedActivities and only return the `activityId`
     * const feedActivityWithActivityIdOnly = await prisma.feedActivity.createManyAndReturn({
     *   select: { activityId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FeedActivityCreateManyAndReturnArgs>(args?: SelectSubset<T, FeedActivityCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FeedActivityPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a FeedActivity.
     * @param {FeedActivityDeleteArgs} args - Arguments to delete one FeedActivity.
     * @example
     * // Delete one FeedActivity
     * const FeedActivity = await prisma.feedActivity.delete({
     *   where: {
     *     // ... filter to delete one FeedActivity
     *   }
     * })
     * 
     */
    delete<T extends FeedActivityDeleteArgs>(args: SelectSubset<T, FeedActivityDeleteArgs<ExtArgs>>): Prisma__FeedActivityClient<$Result.GetResult<Prisma.$FeedActivityPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one FeedActivity.
     * @param {FeedActivityUpdateArgs} args - Arguments to update one FeedActivity.
     * @example
     * // Update one FeedActivity
     * const feedActivity = await prisma.feedActivity.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FeedActivityUpdateArgs>(args: SelectSubset<T, FeedActivityUpdateArgs<ExtArgs>>): Prisma__FeedActivityClient<$Result.GetResult<Prisma.$FeedActivityPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more FeedActivities.
     * @param {FeedActivityDeleteManyArgs} args - Arguments to filter FeedActivities to delete.
     * @example
     * // Delete a few FeedActivities
     * const { count } = await prisma.feedActivity.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FeedActivityDeleteManyArgs>(args?: SelectSubset<T, FeedActivityDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FeedActivities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedActivityUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many FeedActivities
     * const feedActivity = await prisma.feedActivity.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FeedActivityUpdateManyArgs>(args: SelectSubset<T, FeedActivityUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FeedActivities and returns the data updated in the database.
     * @param {FeedActivityUpdateManyAndReturnArgs} args - Arguments to update many FeedActivities.
     * @example
     * // Update many FeedActivities
     * const feedActivity = await prisma.feedActivity.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more FeedActivities and only return the `activityId`
     * const feedActivityWithActivityIdOnly = await prisma.feedActivity.updateManyAndReturn({
     *   select: { activityId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends FeedActivityUpdateManyAndReturnArgs>(args: SelectSubset<T, FeedActivityUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FeedActivityPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one FeedActivity.
     * @param {FeedActivityUpsertArgs} args - Arguments to update or create a FeedActivity.
     * @example
     * // Update or create a FeedActivity
     * const feedActivity = await prisma.feedActivity.upsert({
     *   create: {
     *     // ... data to create a FeedActivity
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the FeedActivity we want to update
     *   }
     * })
     */
    upsert<T extends FeedActivityUpsertArgs>(args: SelectSubset<T, FeedActivityUpsertArgs<ExtArgs>>): Prisma__FeedActivityClient<$Result.GetResult<Prisma.$FeedActivityPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of FeedActivities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedActivityCountArgs} args - Arguments to filter FeedActivities to count.
     * @example
     * // Count the number of FeedActivities
     * const count = await prisma.feedActivity.count({
     *   where: {
     *     // ... the filter for the FeedActivities we want to count
     *   }
     * })
    **/
    count<T extends FeedActivityCountArgs>(
      args?: Subset<T, FeedActivityCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FeedActivityCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a FeedActivity.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedActivityAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FeedActivityAggregateArgs>(args: Subset<T, FeedActivityAggregateArgs>): Prisma.PrismaPromise<GetFeedActivityAggregateType<T>>

    /**
     * Group by FeedActivity.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedActivityGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FeedActivityGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FeedActivityGroupByArgs['orderBy'] }
        : { orderBy?: FeedActivityGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FeedActivityGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFeedActivityGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the FeedActivity model
   */
  readonly fields: FeedActivityFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for FeedActivity.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FeedActivityClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    calendarEvent<T extends FeedActivity$calendarEventArgs<ExtArgs> = {}>(args?: Subset<T, FeedActivity$calendarEventArgs<ExtArgs>>): Prisma__CalendarEventClient<$Result.GetResult<Prisma.$CalendarEventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    user<T extends FeedActivity$userArgs<ExtArgs> = {}>(args?: Subset<T, FeedActivity$userArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the FeedActivity model
   */
  interface FeedActivityFieldRefs {
    readonly activityId: FieldRef<"FeedActivity", 'String'>
    readonly activityType: FieldRef<"FeedActivity", 'String'>
    readonly createdAt: FieldRef<"FeedActivity", 'DateTime'>
    readonly subjectType: FieldRef<"FeedActivity", 'String'>
    readonly subjectId: FieldRef<"FeedActivity", 'String'>
    readonly calendarEventId: FieldRef<"FeedActivity", 'String'>
    readonly userId: FieldRef<"FeedActivity", 'String'>
  }
    

  // Custom InputTypes
  /**
   * FeedActivity findUnique
   */
  export type FeedActivityFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeedActivity
     */
    select?: FeedActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the FeedActivity
     */
    omit?: FeedActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedActivityInclude<ExtArgs> | null
    /**
     * Filter, which FeedActivity to fetch.
     */
    where: FeedActivityWhereUniqueInput
  }

  /**
   * FeedActivity findUniqueOrThrow
   */
  export type FeedActivityFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeedActivity
     */
    select?: FeedActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the FeedActivity
     */
    omit?: FeedActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedActivityInclude<ExtArgs> | null
    /**
     * Filter, which FeedActivity to fetch.
     */
    where: FeedActivityWhereUniqueInput
  }

  /**
   * FeedActivity findFirst
   */
  export type FeedActivityFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeedActivity
     */
    select?: FeedActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the FeedActivity
     */
    omit?: FeedActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedActivityInclude<ExtArgs> | null
    /**
     * Filter, which FeedActivity to fetch.
     */
    where?: FeedActivityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FeedActivities to fetch.
     */
    orderBy?: FeedActivityOrderByWithRelationInput | FeedActivityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FeedActivities.
     */
    cursor?: FeedActivityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FeedActivities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FeedActivities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FeedActivities.
     */
    distinct?: FeedActivityScalarFieldEnum | FeedActivityScalarFieldEnum[]
  }

  /**
   * FeedActivity findFirstOrThrow
   */
  export type FeedActivityFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeedActivity
     */
    select?: FeedActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the FeedActivity
     */
    omit?: FeedActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedActivityInclude<ExtArgs> | null
    /**
     * Filter, which FeedActivity to fetch.
     */
    where?: FeedActivityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FeedActivities to fetch.
     */
    orderBy?: FeedActivityOrderByWithRelationInput | FeedActivityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FeedActivities.
     */
    cursor?: FeedActivityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FeedActivities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FeedActivities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FeedActivities.
     */
    distinct?: FeedActivityScalarFieldEnum | FeedActivityScalarFieldEnum[]
  }

  /**
   * FeedActivity findMany
   */
  export type FeedActivityFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeedActivity
     */
    select?: FeedActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the FeedActivity
     */
    omit?: FeedActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedActivityInclude<ExtArgs> | null
    /**
     * Filter, which FeedActivities to fetch.
     */
    where?: FeedActivityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FeedActivities to fetch.
     */
    orderBy?: FeedActivityOrderByWithRelationInput | FeedActivityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing FeedActivities.
     */
    cursor?: FeedActivityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FeedActivities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FeedActivities.
     */
    skip?: number
    distinct?: FeedActivityScalarFieldEnum | FeedActivityScalarFieldEnum[]
  }

  /**
   * FeedActivity create
   */
  export type FeedActivityCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeedActivity
     */
    select?: FeedActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the FeedActivity
     */
    omit?: FeedActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedActivityInclude<ExtArgs> | null
    /**
     * The data needed to create a FeedActivity.
     */
    data: XOR<FeedActivityCreateInput, FeedActivityUncheckedCreateInput>
  }

  /**
   * FeedActivity createMany
   */
  export type FeedActivityCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many FeedActivities.
     */
    data: FeedActivityCreateManyInput | FeedActivityCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * FeedActivity createManyAndReturn
   */
  export type FeedActivityCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeedActivity
     */
    select?: FeedActivitySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FeedActivity
     */
    omit?: FeedActivityOmit<ExtArgs> | null
    /**
     * The data used to create many FeedActivities.
     */
    data: FeedActivityCreateManyInput | FeedActivityCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedActivityIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * FeedActivity update
   */
  export type FeedActivityUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeedActivity
     */
    select?: FeedActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the FeedActivity
     */
    omit?: FeedActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedActivityInclude<ExtArgs> | null
    /**
     * The data needed to update a FeedActivity.
     */
    data: XOR<FeedActivityUpdateInput, FeedActivityUncheckedUpdateInput>
    /**
     * Choose, which FeedActivity to update.
     */
    where: FeedActivityWhereUniqueInput
  }

  /**
   * FeedActivity updateMany
   */
  export type FeedActivityUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update FeedActivities.
     */
    data: XOR<FeedActivityUpdateManyMutationInput, FeedActivityUncheckedUpdateManyInput>
    /**
     * Filter which FeedActivities to update
     */
    where?: FeedActivityWhereInput
    /**
     * Limit how many FeedActivities to update.
     */
    limit?: number
  }

  /**
   * FeedActivity updateManyAndReturn
   */
  export type FeedActivityUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeedActivity
     */
    select?: FeedActivitySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FeedActivity
     */
    omit?: FeedActivityOmit<ExtArgs> | null
    /**
     * The data used to update FeedActivities.
     */
    data: XOR<FeedActivityUpdateManyMutationInput, FeedActivityUncheckedUpdateManyInput>
    /**
     * Filter which FeedActivities to update
     */
    where?: FeedActivityWhereInput
    /**
     * Limit how many FeedActivities to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedActivityIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * FeedActivity upsert
   */
  export type FeedActivityUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeedActivity
     */
    select?: FeedActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the FeedActivity
     */
    omit?: FeedActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedActivityInclude<ExtArgs> | null
    /**
     * The filter to search for the FeedActivity to update in case it exists.
     */
    where: FeedActivityWhereUniqueInput
    /**
     * In case the FeedActivity found by the `where` argument doesn't exist, create a new FeedActivity with this data.
     */
    create: XOR<FeedActivityCreateInput, FeedActivityUncheckedCreateInput>
    /**
     * In case the FeedActivity was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FeedActivityUpdateInput, FeedActivityUncheckedUpdateInput>
  }

  /**
   * FeedActivity delete
   */
  export type FeedActivityDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeedActivity
     */
    select?: FeedActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the FeedActivity
     */
    omit?: FeedActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedActivityInclude<ExtArgs> | null
    /**
     * Filter which FeedActivity to delete.
     */
    where: FeedActivityWhereUniqueInput
  }

  /**
   * FeedActivity deleteMany
   */
  export type FeedActivityDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FeedActivities to delete
     */
    where?: FeedActivityWhereInput
    /**
     * Limit how many FeedActivities to delete.
     */
    limit?: number
  }

  /**
   * FeedActivity.calendarEvent
   */
  export type FeedActivity$calendarEventArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CalendarEvent
     */
    select?: CalendarEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CalendarEvent
     */
    omit?: CalendarEventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CalendarEventInclude<ExtArgs> | null
    where?: CalendarEventWhereInput
  }

  /**
   * FeedActivity.user
   */
  export type FeedActivity$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * FeedActivity without action
   */
  export type FeedActivityDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeedActivity
     */
    select?: FeedActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the FeedActivity
     */
    omit?: FeedActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedActivityInclude<ExtArgs> | null
  }


  /**
   * Model GuildInvitation
   */

  export type AggregateGuildInvitation = {
    _count: GuildInvitationCountAggregateOutputType | null
    _min: GuildInvitationMinAggregateOutputType | null
    _max: GuildInvitationMaxAggregateOutputType | null
  }

  export type GuildInvitationMinAggregateOutputType = {
    invitationId: string | null
    guildId: string | null
    invitedUserId: string | null
    invitedById: string | null
    status: $Enums.GuildInvitationStatus | null
    createdAt: Date | null
    respondedAt: Date | null
  }

  export type GuildInvitationMaxAggregateOutputType = {
    invitationId: string | null
    guildId: string | null
    invitedUserId: string | null
    invitedById: string | null
    status: $Enums.GuildInvitationStatus | null
    createdAt: Date | null
    respondedAt: Date | null
  }

  export type GuildInvitationCountAggregateOutputType = {
    invitationId: number
    guildId: number
    invitedUserId: number
    invitedById: number
    status: number
    createdAt: number
    respondedAt: number
    _all: number
  }


  export type GuildInvitationMinAggregateInputType = {
    invitationId?: true
    guildId?: true
    invitedUserId?: true
    invitedById?: true
    status?: true
    createdAt?: true
    respondedAt?: true
  }

  export type GuildInvitationMaxAggregateInputType = {
    invitationId?: true
    guildId?: true
    invitedUserId?: true
    invitedById?: true
    status?: true
    createdAt?: true
    respondedAt?: true
  }

  export type GuildInvitationCountAggregateInputType = {
    invitationId?: true
    guildId?: true
    invitedUserId?: true
    invitedById?: true
    status?: true
    createdAt?: true
    respondedAt?: true
    _all?: true
  }

  export type GuildInvitationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GuildInvitation to aggregate.
     */
    where?: GuildInvitationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GuildInvitations to fetch.
     */
    orderBy?: GuildInvitationOrderByWithRelationInput | GuildInvitationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GuildInvitationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GuildInvitations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GuildInvitations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned GuildInvitations
    **/
    _count?: true | GuildInvitationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GuildInvitationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GuildInvitationMaxAggregateInputType
  }

  export type GetGuildInvitationAggregateType<T extends GuildInvitationAggregateArgs> = {
        [P in keyof T & keyof AggregateGuildInvitation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGuildInvitation[P]>
      : GetScalarType<T[P], AggregateGuildInvitation[P]>
  }




  export type GuildInvitationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GuildInvitationWhereInput
    orderBy?: GuildInvitationOrderByWithAggregationInput | GuildInvitationOrderByWithAggregationInput[]
    by: GuildInvitationScalarFieldEnum[] | GuildInvitationScalarFieldEnum
    having?: GuildInvitationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GuildInvitationCountAggregateInputType | true
    _min?: GuildInvitationMinAggregateInputType
    _max?: GuildInvitationMaxAggregateInputType
  }

  export type GuildInvitationGroupByOutputType = {
    invitationId: string
    guildId: string
    invitedUserId: string
    invitedById: string | null
    status: $Enums.GuildInvitationStatus
    createdAt: Date
    respondedAt: Date | null
    _count: GuildInvitationCountAggregateOutputType | null
    _min: GuildInvitationMinAggregateOutputType | null
    _max: GuildInvitationMaxAggregateOutputType | null
  }

  type GetGuildInvitationGroupByPayload<T extends GuildInvitationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GuildInvitationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GuildInvitationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GuildInvitationGroupByOutputType[P]>
            : GetScalarType<T[P], GuildInvitationGroupByOutputType[P]>
        }
      >
    >


  export type GuildInvitationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    invitationId?: boolean
    guildId?: boolean
    invitedUserId?: boolean
    invitedById?: boolean
    status?: boolean
    createdAt?: boolean
    respondedAt?: boolean
    guild?: boolean | GuildDefaultArgs<ExtArgs>
    invitedUser?: boolean | UserDefaultArgs<ExtArgs>
    invitedBy?: boolean | GuildInvitation$invitedByArgs<ExtArgs>
  }, ExtArgs["result"]["guildInvitation"]>

  export type GuildInvitationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    invitationId?: boolean
    guildId?: boolean
    invitedUserId?: boolean
    invitedById?: boolean
    status?: boolean
    createdAt?: boolean
    respondedAt?: boolean
    guild?: boolean | GuildDefaultArgs<ExtArgs>
    invitedUser?: boolean | UserDefaultArgs<ExtArgs>
    invitedBy?: boolean | GuildInvitation$invitedByArgs<ExtArgs>
  }, ExtArgs["result"]["guildInvitation"]>

  export type GuildInvitationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    invitationId?: boolean
    guildId?: boolean
    invitedUserId?: boolean
    invitedById?: boolean
    status?: boolean
    createdAt?: boolean
    respondedAt?: boolean
    guild?: boolean | GuildDefaultArgs<ExtArgs>
    invitedUser?: boolean | UserDefaultArgs<ExtArgs>
    invitedBy?: boolean | GuildInvitation$invitedByArgs<ExtArgs>
  }, ExtArgs["result"]["guildInvitation"]>

  export type GuildInvitationSelectScalar = {
    invitationId?: boolean
    guildId?: boolean
    invitedUserId?: boolean
    invitedById?: boolean
    status?: boolean
    createdAt?: boolean
    respondedAt?: boolean
  }

  export type GuildInvitationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"invitationId" | "guildId" | "invitedUserId" | "invitedById" | "status" | "createdAt" | "respondedAt", ExtArgs["result"]["guildInvitation"]>
  export type GuildInvitationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    guild?: boolean | GuildDefaultArgs<ExtArgs>
    invitedUser?: boolean | UserDefaultArgs<ExtArgs>
    invitedBy?: boolean | GuildInvitation$invitedByArgs<ExtArgs>
  }
  export type GuildInvitationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    guild?: boolean | GuildDefaultArgs<ExtArgs>
    invitedUser?: boolean | UserDefaultArgs<ExtArgs>
    invitedBy?: boolean | GuildInvitation$invitedByArgs<ExtArgs>
  }
  export type GuildInvitationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    guild?: boolean | GuildDefaultArgs<ExtArgs>
    invitedUser?: boolean | UserDefaultArgs<ExtArgs>
    invitedBy?: boolean | GuildInvitation$invitedByArgs<ExtArgs>
  }

  export type $GuildInvitationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "GuildInvitation"
    objects: {
      guild: Prisma.$GuildPayload<ExtArgs>
      invitedUser: Prisma.$UserPayload<ExtArgs>
      invitedBy: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      invitationId: string
      guildId: string
      invitedUserId: string
      invitedById: string | null
      status: $Enums.GuildInvitationStatus
      createdAt: Date
      respondedAt: Date | null
    }, ExtArgs["result"]["guildInvitation"]>
    composites: {}
  }

  type GuildInvitationGetPayload<S extends boolean | null | undefined | GuildInvitationDefaultArgs> = $Result.GetResult<Prisma.$GuildInvitationPayload, S>

  type GuildInvitationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<GuildInvitationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: GuildInvitationCountAggregateInputType | true
    }

  export interface GuildInvitationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['GuildInvitation'], meta: { name: 'GuildInvitation' } }
    /**
     * Find zero or one GuildInvitation that matches the filter.
     * @param {GuildInvitationFindUniqueArgs} args - Arguments to find a GuildInvitation
     * @example
     * // Get one GuildInvitation
     * const guildInvitation = await prisma.guildInvitation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GuildInvitationFindUniqueArgs>(args: SelectSubset<T, GuildInvitationFindUniqueArgs<ExtArgs>>): Prisma__GuildInvitationClient<$Result.GetResult<Prisma.$GuildInvitationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one GuildInvitation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {GuildInvitationFindUniqueOrThrowArgs} args - Arguments to find a GuildInvitation
     * @example
     * // Get one GuildInvitation
     * const guildInvitation = await prisma.guildInvitation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GuildInvitationFindUniqueOrThrowArgs>(args: SelectSubset<T, GuildInvitationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GuildInvitationClient<$Result.GetResult<Prisma.$GuildInvitationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first GuildInvitation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GuildInvitationFindFirstArgs} args - Arguments to find a GuildInvitation
     * @example
     * // Get one GuildInvitation
     * const guildInvitation = await prisma.guildInvitation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GuildInvitationFindFirstArgs>(args?: SelectSubset<T, GuildInvitationFindFirstArgs<ExtArgs>>): Prisma__GuildInvitationClient<$Result.GetResult<Prisma.$GuildInvitationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first GuildInvitation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GuildInvitationFindFirstOrThrowArgs} args - Arguments to find a GuildInvitation
     * @example
     * // Get one GuildInvitation
     * const guildInvitation = await prisma.guildInvitation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GuildInvitationFindFirstOrThrowArgs>(args?: SelectSubset<T, GuildInvitationFindFirstOrThrowArgs<ExtArgs>>): Prisma__GuildInvitationClient<$Result.GetResult<Prisma.$GuildInvitationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more GuildInvitations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GuildInvitationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all GuildInvitations
     * const guildInvitations = await prisma.guildInvitation.findMany()
     * 
     * // Get first 10 GuildInvitations
     * const guildInvitations = await prisma.guildInvitation.findMany({ take: 10 })
     * 
     * // Only select the `invitationId`
     * const guildInvitationWithInvitationIdOnly = await prisma.guildInvitation.findMany({ select: { invitationId: true } })
     * 
     */
    findMany<T extends GuildInvitationFindManyArgs>(args?: SelectSubset<T, GuildInvitationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GuildInvitationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a GuildInvitation.
     * @param {GuildInvitationCreateArgs} args - Arguments to create a GuildInvitation.
     * @example
     * // Create one GuildInvitation
     * const GuildInvitation = await prisma.guildInvitation.create({
     *   data: {
     *     // ... data to create a GuildInvitation
     *   }
     * })
     * 
     */
    create<T extends GuildInvitationCreateArgs>(args: SelectSubset<T, GuildInvitationCreateArgs<ExtArgs>>): Prisma__GuildInvitationClient<$Result.GetResult<Prisma.$GuildInvitationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many GuildInvitations.
     * @param {GuildInvitationCreateManyArgs} args - Arguments to create many GuildInvitations.
     * @example
     * // Create many GuildInvitations
     * const guildInvitation = await prisma.guildInvitation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GuildInvitationCreateManyArgs>(args?: SelectSubset<T, GuildInvitationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many GuildInvitations and returns the data saved in the database.
     * @param {GuildInvitationCreateManyAndReturnArgs} args - Arguments to create many GuildInvitations.
     * @example
     * // Create many GuildInvitations
     * const guildInvitation = await prisma.guildInvitation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many GuildInvitations and only return the `invitationId`
     * const guildInvitationWithInvitationIdOnly = await prisma.guildInvitation.createManyAndReturn({
     *   select: { invitationId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GuildInvitationCreateManyAndReturnArgs>(args?: SelectSubset<T, GuildInvitationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GuildInvitationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a GuildInvitation.
     * @param {GuildInvitationDeleteArgs} args - Arguments to delete one GuildInvitation.
     * @example
     * // Delete one GuildInvitation
     * const GuildInvitation = await prisma.guildInvitation.delete({
     *   where: {
     *     // ... filter to delete one GuildInvitation
     *   }
     * })
     * 
     */
    delete<T extends GuildInvitationDeleteArgs>(args: SelectSubset<T, GuildInvitationDeleteArgs<ExtArgs>>): Prisma__GuildInvitationClient<$Result.GetResult<Prisma.$GuildInvitationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one GuildInvitation.
     * @param {GuildInvitationUpdateArgs} args - Arguments to update one GuildInvitation.
     * @example
     * // Update one GuildInvitation
     * const guildInvitation = await prisma.guildInvitation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GuildInvitationUpdateArgs>(args: SelectSubset<T, GuildInvitationUpdateArgs<ExtArgs>>): Prisma__GuildInvitationClient<$Result.GetResult<Prisma.$GuildInvitationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more GuildInvitations.
     * @param {GuildInvitationDeleteManyArgs} args - Arguments to filter GuildInvitations to delete.
     * @example
     * // Delete a few GuildInvitations
     * const { count } = await prisma.guildInvitation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GuildInvitationDeleteManyArgs>(args?: SelectSubset<T, GuildInvitationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GuildInvitations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GuildInvitationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many GuildInvitations
     * const guildInvitation = await prisma.guildInvitation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GuildInvitationUpdateManyArgs>(args: SelectSubset<T, GuildInvitationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GuildInvitations and returns the data updated in the database.
     * @param {GuildInvitationUpdateManyAndReturnArgs} args - Arguments to update many GuildInvitations.
     * @example
     * // Update many GuildInvitations
     * const guildInvitation = await prisma.guildInvitation.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more GuildInvitations and only return the `invitationId`
     * const guildInvitationWithInvitationIdOnly = await prisma.guildInvitation.updateManyAndReturn({
     *   select: { invitationId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends GuildInvitationUpdateManyAndReturnArgs>(args: SelectSubset<T, GuildInvitationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GuildInvitationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one GuildInvitation.
     * @param {GuildInvitationUpsertArgs} args - Arguments to update or create a GuildInvitation.
     * @example
     * // Update or create a GuildInvitation
     * const guildInvitation = await prisma.guildInvitation.upsert({
     *   create: {
     *     // ... data to create a GuildInvitation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the GuildInvitation we want to update
     *   }
     * })
     */
    upsert<T extends GuildInvitationUpsertArgs>(args: SelectSubset<T, GuildInvitationUpsertArgs<ExtArgs>>): Prisma__GuildInvitationClient<$Result.GetResult<Prisma.$GuildInvitationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of GuildInvitations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GuildInvitationCountArgs} args - Arguments to filter GuildInvitations to count.
     * @example
     * // Count the number of GuildInvitations
     * const count = await prisma.guildInvitation.count({
     *   where: {
     *     // ... the filter for the GuildInvitations we want to count
     *   }
     * })
    **/
    count<T extends GuildInvitationCountArgs>(
      args?: Subset<T, GuildInvitationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GuildInvitationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a GuildInvitation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GuildInvitationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GuildInvitationAggregateArgs>(args: Subset<T, GuildInvitationAggregateArgs>): Prisma.PrismaPromise<GetGuildInvitationAggregateType<T>>

    /**
     * Group by GuildInvitation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GuildInvitationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends GuildInvitationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GuildInvitationGroupByArgs['orderBy'] }
        : { orderBy?: GuildInvitationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, GuildInvitationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGuildInvitationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the GuildInvitation model
   */
  readonly fields: GuildInvitationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for GuildInvitation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GuildInvitationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    guild<T extends GuildDefaultArgs<ExtArgs> = {}>(args?: Subset<T, GuildDefaultArgs<ExtArgs>>): Prisma__GuildClient<$Result.GetResult<Prisma.$GuildPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    invitedUser<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    invitedBy<T extends GuildInvitation$invitedByArgs<ExtArgs> = {}>(args?: Subset<T, GuildInvitation$invitedByArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the GuildInvitation model
   */
  interface GuildInvitationFieldRefs {
    readonly invitationId: FieldRef<"GuildInvitation", 'String'>
    readonly guildId: FieldRef<"GuildInvitation", 'String'>
    readonly invitedUserId: FieldRef<"GuildInvitation", 'String'>
    readonly invitedById: FieldRef<"GuildInvitation", 'String'>
    readonly status: FieldRef<"GuildInvitation", 'GuildInvitationStatus'>
    readonly createdAt: FieldRef<"GuildInvitation", 'DateTime'>
    readonly respondedAt: FieldRef<"GuildInvitation", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * GuildInvitation findUnique
   */
  export type GuildInvitationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GuildInvitation
     */
    select?: GuildInvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GuildInvitation
     */
    omit?: GuildInvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuildInvitationInclude<ExtArgs> | null
    /**
     * Filter, which GuildInvitation to fetch.
     */
    where: GuildInvitationWhereUniqueInput
  }

  /**
   * GuildInvitation findUniqueOrThrow
   */
  export type GuildInvitationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GuildInvitation
     */
    select?: GuildInvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GuildInvitation
     */
    omit?: GuildInvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuildInvitationInclude<ExtArgs> | null
    /**
     * Filter, which GuildInvitation to fetch.
     */
    where: GuildInvitationWhereUniqueInput
  }

  /**
   * GuildInvitation findFirst
   */
  export type GuildInvitationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GuildInvitation
     */
    select?: GuildInvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GuildInvitation
     */
    omit?: GuildInvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuildInvitationInclude<ExtArgs> | null
    /**
     * Filter, which GuildInvitation to fetch.
     */
    where?: GuildInvitationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GuildInvitations to fetch.
     */
    orderBy?: GuildInvitationOrderByWithRelationInput | GuildInvitationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GuildInvitations.
     */
    cursor?: GuildInvitationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GuildInvitations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GuildInvitations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GuildInvitations.
     */
    distinct?: GuildInvitationScalarFieldEnum | GuildInvitationScalarFieldEnum[]
  }

  /**
   * GuildInvitation findFirstOrThrow
   */
  export type GuildInvitationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GuildInvitation
     */
    select?: GuildInvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GuildInvitation
     */
    omit?: GuildInvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuildInvitationInclude<ExtArgs> | null
    /**
     * Filter, which GuildInvitation to fetch.
     */
    where?: GuildInvitationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GuildInvitations to fetch.
     */
    orderBy?: GuildInvitationOrderByWithRelationInput | GuildInvitationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GuildInvitations.
     */
    cursor?: GuildInvitationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GuildInvitations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GuildInvitations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GuildInvitations.
     */
    distinct?: GuildInvitationScalarFieldEnum | GuildInvitationScalarFieldEnum[]
  }

  /**
   * GuildInvitation findMany
   */
  export type GuildInvitationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GuildInvitation
     */
    select?: GuildInvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GuildInvitation
     */
    omit?: GuildInvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuildInvitationInclude<ExtArgs> | null
    /**
     * Filter, which GuildInvitations to fetch.
     */
    where?: GuildInvitationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GuildInvitations to fetch.
     */
    orderBy?: GuildInvitationOrderByWithRelationInput | GuildInvitationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing GuildInvitations.
     */
    cursor?: GuildInvitationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GuildInvitations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GuildInvitations.
     */
    skip?: number
    distinct?: GuildInvitationScalarFieldEnum | GuildInvitationScalarFieldEnum[]
  }

  /**
   * GuildInvitation create
   */
  export type GuildInvitationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GuildInvitation
     */
    select?: GuildInvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GuildInvitation
     */
    omit?: GuildInvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuildInvitationInclude<ExtArgs> | null
    /**
     * The data needed to create a GuildInvitation.
     */
    data: XOR<GuildInvitationCreateInput, GuildInvitationUncheckedCreateInput>
  }

  /**
   * GuildInvitation createMany
   */
  export type GuildInvitationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many GuildInvitations.
     */
    data: GuildInvitationCreateManyInput | GuildInvitationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * GuildInvitation createManyAndReturn
   */
  export type GuildInvitationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GuildInvitation
     */
    select?: GuildInvitationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the GuildInvitation
     */
    omit?: GuildInvitationOmit<ExtArgs> | null
    /**
     * The data used to create many GuildInvitations.
     */
    data: GuildInvitationCreateManyInput | GuildInvitationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuildInvitationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * GuildInvitation update
   */
  export type GuildInvitationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GuildInvitation
     */
    select?: GuildInvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GuildInvitation
     */
    omit?: GuildInvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuildInvitationInclude<ExtArgs> | null
    /**
     * The data needed to update a GuildInvitation.
     */
    data: XOR<GuildInvitationUpdateInput, GuildInvitationUncheckedUpdateInput>
    /**
     * Choose, which GuildInvitation to update.
     */
    where: GuildInvitationWhereUniqueInput
  }

  /**
   * GuildInvitation updateMany
   */
  export type GuildInvitationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update GuildInvitations.
     */
    data: XOR<GuildInvitationUpdateManyMutationInput, GuildInvitationUncheckedUpdateManyInput>
    /**
     * Filter which GuildInvitations to update
     */
    where?: GuildInvitationWhereInput
    /**
     * Limit how many GuildInvitations to update.
     */
    limit?: number
  }

  /**
   * GuildInvitation updateManyAndReturn
   */
  export type GuildInvitationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GuildInvitation
     */
    select?: GuildInvitationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the GuildInvitation
     */
    omit?: GuildInvitationOmit<ExtArgs> | null
    /**
     * The data used to update GuildInvitations.
     */
    data: XOR<GuildInvitationUpdateManyMutationInput, GuildInvitationUncheckedUpdateManyInput>
    /**
     * Filter which GuildInvitations to update
     */
    where?: GuildInvitationWhereInput
    /**
     * Limit how many GuildInvitations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuildInvitationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * GuildInvitation upsert
   */
  export type GuildInvitationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GuildInvitation
     */
    select?: GuildInvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GuildInvitation
     */
    omit?: GuildInvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuildInvitationInclude<ExtArgs> | null
    /**
     * The filter to search for the GuildInvitation to update in case it exists.
     */
    where: GuildInvitationWhereUniqueInput
    /**
     * In case the GuildInvitation found by the `where` argument doesn't exist, create a new GuildInvitation with this data.
     */
    create: XOR<GuildInvitationCreateInput, GuildInvitationUncheckedCreateInput>
    /**
     * In case the GuildInvitation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GuildInvitationUpdateInput, GuildInvitationUncheckedUpdateInput>
  }

  /**
   * GuildInvitation delete
   */
  export type GuildInvitationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GuildInvitation
     */
    select?: GuildInvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GuildInvitation
     */
    omit?: GuildInvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuildInvitationInclude<ExtArgs> | null
    /**
     * Filter which GuildInvitation to delete.
     */
    where: GuildInvitationWhereUniqueInput
  }

  /**
   * GuildInvitation deleteMany
   */
  export type GuildInvitationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GuildInvitations to delete
     */
    where?: GuildInvitationWhereInput
    /**
     * Limit how many GuildInvitations to delete.
     */
    limit?: number
  }

  /**
   * GuildInvitation.invitedBy
   */
  export type GuildInvitation$invitedByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * GuildInvitation without action
   */
  export type GuildInvitationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GuildInvitation
     */
    select?: GuildInvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GuildInvitation
     */
    omit?: GuildInvitationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuildInvitationInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    userId: 'userId',
    email: 'email',
    displayName: 'displayName',
    avatar: 'avatar',
    firebaseUid: 'firebaseUid',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const FollowScalarFieldEnum: {
    followId: 'followId',
    userId: 'userId',
    entityType: 'entityType',
    followedUserId: 'followedUserId',
    tagId: 'tagId',
    guildId: 'guildId',
    createdAt: 'createdAt'
  };

  export type FollowScalarFieldEnum = (typeof FollowScalarFieldEnum)[keyof typeof FollowScalarFieldEnum]


  export const TagScalarFieldEnum: {
    tagId: 'tagId',
    category: 'category',
    value: 'value'
  };

  export type TagScalarFieldEnum = (typeof TagScalarFieldEnum)[keyof typeof TagScalarFieldEnum]


  export const GuildScalarFieldEnum: {
    guildId: 'guildId',
    name: 'name',
    guildType: 'guildType',
    createdAt: 'createdAt',
    createdById: 'createdById',
    currentOwnerId: 'currentOwnerId',
    actId: 'actId',
    venueId: 'venueId',
    clubId: 'clubId'
  };

  export type GuildScalarFieldEnum = (typeof GuildScalarFieldEnum)[keyof typeof GuildScalarFieldEnum]


  export const ActScalarFieldEnum: {
    actId: 'actId',
    name: 'name',
    bio: 'bio',
    avatar: 'avatar',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ActScalarFieldEnum = (typeof ActScalarFieldEnum)[keyof typeof ActScalarFieldEnum]


  export const VenueScalarFieldEnum: {
    venueId: 'venueId',
    name: 'name',
    address: 'address',
    city: 'city',
    state: 'state',
    zipCode: 'zipCode',
    avatar: 'avatar',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type VenueScalarFieldEnum = (typeof VenueScalarFieldEnum)[keyof typeof VenueScalarFieldEnum]


  export const ClubScalarFieldEnum: {
    clubId: 'clubId',
    name: 'name',
    description: 'description',
    avatar: 'avatar',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ClubScalarFieldEnum = (typeof ClubScalarFieldEnum)[keyof typeof ClubScalarFieldEnum]


  export const CalendarEventScalarFieldEnum: {
    eventId: 'eventId',
    title: 'title',
    description: 'description',
    poster: 'poster',
    startTime: 'startTime',
    duration: 'duration',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    venueId: 'venueId'
  };

  export type CalendarEventScalarFieldEnum = (typeof CalendarEventScalarFieldEnum)[keyof typeof CalendarEventScalarFieldEnum]


  export const FeedActivityScalarFieldEnum: {
    activityId: 'activityId',
    activityType: 'activityType',
    createdAt: 'createdAt',
    subjectType: 'subjectType',
    subjectId: 'subjectId',
    calendarEventId: 'calendarEventId',
    userId: 'userId'
  };

  export type FeedActivityScalarFieldEnum = (typeof FeedActivityScalarFieldEnum)[keyof typeof FeedActivityScalarFieldEnum]


  export const GuildInvitationScalarFieldEnum: {
    invitationId: 'invitationId',
    guildId: 'guildId',
    invitedUserId: 'invitedUserId',
    invitedById: 'invitedById',
    status: 'status',
    createdAt: 'createdAt',
    respondedAt: 'respondedAt'
  };

  export type GuildInvitationScalarFieldEnum = (typeof GuildInvitationScalarFieldEnum)[keyof typeof GuildInvitationScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'FollowEntityType'
   */
  export type EnumFollowEntityTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'FollowEntityType'>
    


  /**
   * Reference to a field of type 'FollowEntityType[]'
   */
  export type ListEnumFollowEntityTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'FollowEntityType[]'>
    


  /**
   * Reference to a field of type 'GuildType'
   */
  export type EnumGuildTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'GuildType'>
    


  /**
   * Reference to a field of type 'GuildType[]'
   */
  export type ListEnumGuildTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'GuildType[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'GuildInvitationStatus'
   */
  export type EnumGuildInvitationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'GuildInvitationStatus'>
    


  /**
   * Reference to a field of type 'GuildInvitationStatus[]'
   */
  export type ListEnumGuildInvitationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'GuildInvitationStatus[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    userId?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    displayName?: StringNullableFilter<"User"> | string | null
    avatar?: StringNullableFilter<"User"> | string | null
    firebaseUid?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    createdGuilds?: GuildListRelationFilter
    ownedGuilds?: GuildListRelationFilter
    memberOfGuilds?: GuildListRelationFilter
    follows?: FollowListRelationFilter
    followedBy?: FollowListRelationFilter
    feedActivities?: FeedActivityListRelationFilter
    sentInvitations?: GuildInvitationListRelationFilter
    receivedInvitations?: GuildInvitationListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    userId?: SortOrder
    email?: SortOrder
    displayName?: SortOrderInput | SortOrder
    avatar?: SortOrderInput | SortOrder
    firebaseUid?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    createdGuilds?: GuildOrderByRelationAggregateInput
    ownedGuilds?: GuildOrderByRelationAggregateInput
    memberOfGuilds?: GuildOrderByRelationAggregateInput
    follows?: FollowOrderByRelationAggregateInput
    followedBy?: FollowOrderByRelationAggregateInput
    feedActivities?: FeedActivityOrderByRelationAggregateInput
    sentInvitations?: GuildInvitationOrderByRelationAggregateInput
    receivedInvitations?: GuildInvitationOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    userId?: string
    email?: string
    firebaseUid?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    displayName?: StringNullableFilter<"User"> | string | null
    avatar?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    createdGuilds?: GuildListRelationFilter
    ownedGuilds?: GuildListRelationFilter
    memberOfGuilds?: GuildListRelationFilter
    follows?: FollowListRelationFilter
    followedBy?: FollowListRelationFilter
    feedActivities?: FeedActivityListRelationFilter
    sentInvitations?: GuildInvitationListRelationFilter
    receivedInvitations?: GuildInvitationListRelationFilter
  }, "userId" | "email" | "firebaseUid">

  export type UserOrderByWithAggregationInput = {
    userId?: SortOrder
    email?: SortOrder
    displayName?: SortOrderInput | SortOrder
    avatar?: SortOrderInput | SortOrder
    firebaseUid?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    userId?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    displayName?: StringNullableWithAggregatesFilter<"User"> | string | null
    avatar?: StringNullableWithAggregatesFilter<"User"> | string | null
    firebaseUid?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type FollowWhereInput = {
    AND?: FollowWhereInput | FollowWhereInput[]
    OR?: FollowWhereInput[]
    NOT?: FollowWhereInput | FollowWhereInput[]
    followId?: StringFilter<"Follow"> | string
    userId?: StringFilter<"Follow"> | string
    entityType?: EnumFollowEntityTypeFilter<"Follow"> | $Enums.FollowEntityType
    followedUserId?: StringNullableFilter<"Follow"> | string | null
    tagId?: StringNullableFilter<"Follow"> | string | null
    guildId?: StringNullableFilter<"Follow"> | string | null
    createdAt?: DateTimeFilter<"Follow"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    followedUser?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    tag?: XOR<TagNullableScalarRelationFilter, TagWhereInput> | null
    guild?: XOR<GuildNullableScalarRelationFilter, GuildWhereInput> | null
  }

  export type FollowOrderByWithRelationInput = {
    followId?: SortOrder
    userId?: SortOrder
    entityType?: SortOrder
    followedUserId?: SortOrderInput | SortOrder
    tagId?: SortOrderInput | SortOrder
    guildId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
    followedUser?: UserOrderByWithRelationInput
    tag?: TagOrderByWithRelationInput
    guild?: GuildOrderByWithRelationInput
  }

  export type FollowWhereUniqueInput = Prisma.AtLeast<{
    followId?: string
    userId_entityType_followedUserId_tagId_guildId?: FollowUserIdEntityTypeFollowedUserIdTagIdGuildIdCompoundUniqueInput
    AND?: FollowWhereInput | FollowWhereInput[]
    OR?: FollowWhereInput[]
    NOT?: FollowWhereInput | FollowWhereInput[]
    userId?: StringFilter<"Follow"> | string
    entityType?: EnumFollowEntityTypeFilter<"Follow"> | $Enums.FollowEntityType
    followedUserId?: StringNullableFilter<"Follow"> | string | null
    tagId?: StringNullableFilter<"Follow"> | string | null
    guildId?: StringNullableFilter<"Follow"> | string | null
    createdAt?: DateTimeFilter<"Follow"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    followedUser?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    tag?: XOR<TagNullableScalarRelationFilter, TagWhereInput> | null
    guild?: XOR<GuildNullableScalarRelationFilter, GuildWhereInput> | null
  }, "followId" | "userId_entityType_followedUserId_tagId_guildId">

  export type FollowOrderByWithAggregationInput = {
    followId?: SortOrder
    userId?: SortOrder
    entityType?: SortOrder
    followedUserId?: SortOrderInput | SortOrder
    tagId?: SortOrderInput | SortOrder
    guildId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: FollowCountOrderByAggregateInput
    _max?: FollowMaxOrderByAggregateInput
    _min?: FollowMinOrderByAggregateInput
  }

  export type FollowScalarWhereWithAggregatesInput = {
    AND?: FollowScalarWhereWithAggregatesInput | FollowScalarWhereWithAggregatesInput[]
    OR?: FollowScalarWhereWithAggregatesInput[]
    NOT?: FollowScalarWhereWithAggregatesInput | FollowScalarWhereWithAggregatesInput[]
    followId?: StringWithAggregatesFilter<"Follow"> | string
    userId?: StringWithAggregatesFilter<"Follow"> | string
    entityType?: EnumFollowEntityTypeWithAggregatesFilter<"Follow"> | $Enums.FollowEntityType
    followedUserId?: StringNullableWithAggregatesFilter<"Follow"> | string | null
    tagId?: StringNullableWithAggregatesFilter<"Follow"> | string | null
    guildId?: StringNullableWithAggregatesFilter<"Follow"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Follow"> | Date | string
  }

  export type TagWhereInput = {
    AND?: TagWhereInput | TagWhereInput[]
    OR?: TagWhereInput[]
    NOT?: TagWhereInput | TagWhereInput[]
    tagId?: StringFilter<"Tag"> | string
    category?: StringFilter<"Tag"> | string
    value?: StringFilter<"Tag"> | string
    follows?: FollowListRelationFilter
  }

  export type TagOrderByWithRelationInput = {
    tagId?: SortOrder
    category?: SortOrder
    value?: SortOrder
    follows?: FollowOrderByRelationAggregateInput
  }

  export type TagWhereUniqueInput = Prisma.AtLeast<{
    tagId?: string
    category_value?: TagCategoryValueCompoundUniqueInput
    AND?: TagWhereInput | TagWhereInput[]
    OR?: TagWhereInput[]
    NOT?: TagWhereInput | TagWhereInput[]
    category?: StringFilter<"Tag"> | string
    value?: StringFilter<"Tag"> | string
    follows?: FollowListRelationFilter
  }, "tagId" | "category_value">

  export type TagOrderByWithAggregationInput = {
    tagId?: SortOrder
    category?: SortOrder
    value?: SortOrder
    _count?: TagCountOrderByAggregateInput
    _max?: TagMaxOrderByAggregateInput
    _min?: TagMinOrderByAggregateInput
  }

  export type TagScalarWhereWithAggregatesInput = {
    AND?: TagScalarWhereWithAggregatesInput | TagScalarWhereWithAggregatesInput[]
    OR?: TagScalarWhereWithAggregatesInput[]
    NOT?: TagScalarWhereWithAggregatesInput | TagScalarWhereWithAggregatesInput[]
    tagId?: StringWithAggregatesFilter<"Tag"> | string
    category?: StringWithAggregatesFilter<"Tag"> | string
    value?: StringWithAggregatesFilter<"Tag"> | string
  }

  export type GuildWhereInput = {
    AND?: GuildWhereInput | GuildWhereInput[]
    OR?: GuildWhereInput[]
    NOT?: GuildWhereInput | GuildWhereInput[]
    guildId?: StringFilter<"Guild"> | string
    name?: StringFilter<"Guild"> | string
    guildType?: EnumGuildTypeFilter<"Guild"> | $Enums.GuildType
    createdAt?: DateTimeFilter<"Guild"> | Date | string
    createdById?: StringNullableFilter<"Guild"> | string | null
    currentOwnerId?: StringFilter<"Guild"> | string
    actId?: StringNullableFilter<"Guild"> | string | null
    venueId?: StringNullableFilter<"Guild"> | string | null
    clubId?: StringNullableFilter<"Guild"> | string | null
    createdBy?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    currentOwner?: XOR<UserScalarRelationFilter, UserWhereInput>
    members?: UserListRelationFilter
    act?: XOR<ActNullableScalarRelationFilter, ActWhereInput> | null
    venue?: XOR<VenueNullableScalarRelationFilter, VenueWhereInput> | null
    club?: XOR<ClubNullableScalarRelationFilter, ClubWhereInput> | null
    follows?: FollowListRelationFilter
    invitations?: GuildInvitationListRelationFilter
  }

  export type GuildOrderByWithRelationInput = {
    guildId?: SortOrder
    name?: SortOrder
    guildType?: SortOrder
    createdAt?: SortOrder
    createdById?: SortOrderInput | SortOrder
    currentOwnerId?: SortOrder
    actId?: SortOrderInput | SortOrder
    venueId?: SortOrderInput | SortOrder
    clubId?: SortOrderInput | SortOrder
    createdBy?: UserOrderByWithRelationInput
    currentOwner?: UserOrderByWithRelationInput
    members?: UserOrderByRelationAggregateInput
    act?: ActOrderByWithRelationInput
    venue?: VenueOrderByWithRelationInput
    club?: ClubOrderByWithRelationInput
    follows?: FollowOrderByRelationAggregateInput
    invitations?: GuildInvitationOrderByRelationAggregateInput
  }

  export type GuildWhereUniqueInput = Prisma.AtLeast<{
    guildId?: string
    actId?: string
    venueId?: string
    clubId?: string
    AND?: GuildWhereInput | GuildWhereInput[]
    OR?: GuildWhereInput[]
    NOT?: GuildWhereInput | GuildWhereInput[]
    name?: StringFilter<"Guild"> | string
    guildType?: EnumGuildTypeFilter<"Guild"> | $Enums.GuildType
    createdAt?: DateTimeFilter<"Guild"> | Date | string
    createdById?: StringNullableFilter<"Guild"> | string | null
    currentOwnerId?: StringFilter<"Guild"> | string
    createdBy?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    currentOwner?: XOR<UserScalarRelationFilter, UserWhereInput>
    members?: UserListRelationFilter
    act?: XOR<ActNullableScalarRelationFilter, ActWhereInput> | null
    venue?: XOR<VenueNullableScalarRelationFilter, VenueWhereInput> | null
    club?: XOR<ClubNullableScalarRelationFilter, ClubWhereInput> | null
    follows?: FollowListRelationFilter
    invitations?: GuildInvitationListRelationFilter
  }, "guildId" | "actId" | "venueId" | "clubId">

  export type GuildOrderByWithAggregationInput = {
    guildId?: SortOrder
    name?: SortOrder
    guildType?: SortOrder
    createdAt?: SortOrder
    createdById?: SortOrderInput | SortOrder
    currentOwnerId?: SortOrder
    actId?: SortOrderInput | SortOrder
    venueId?: SortOrderInput | SortOrder
    clubId?: SortOrderInput | SortOrder
    _count?: GuildCountOrderByAggregateInput
    _max?: GuildMaxOrderByAggregateInput
    _min?: GuildMinOrderByAggregateInput
  }

  export type GuildScalarWhereWithAggregatesInput = {
    AND?: GuildScalarWhereWithAggregatesInput | GuildScalarWhereWithAggregatesInput[]
    OR?: GuildScalarWhereWithAggregatesInput[]
    NOT?: GuildScalarWhereWithAggregatesInput | GuildScalarWhereWithAggregatesInput[]
    guildId?: StringWithAggregatesFilter<"Guild"> | string
    name?: StringWithAggregatesFilter<"Guild"> | string
    guildType?: EnumGuildTypeWithAggregatesFilter<"Guild"> | $Enums.GuildType
    createdAt?: DateTimeWithAggregatesFilter<"Guild"> | Date | string
    createdById?: StringNullableWithAggregatesFilter<"Guild"> | string | null
    currentOwnerId?: StringWithAggregatesFilter<"Guild"> | string
    actId?: StringNullableWithAggregatesFilter<"Guild"> | string | null
    venueId?: StringNullableWithAggregatesFilter<"Guild"> | string | null
    clubId?: StringNullableWithAggregatesFilter<"Guild"> | string | null
  }

  export type ActWhereInput = {
    AND?: ActWhereInput | ActWhereInput[]
    OR?: ActWhereInput[]
    NOT?: ActWhereInput | ActWhereInput[]
    actId?: StringFilter<"Act"> | string
    name?: StringFilter<"Act"> | string
    bio?: StringNullableFilter<"Act"> | string | null
    avatar?: StringNullableFilter<"Act"> | string | null
    createdAt?: DateTimeFilter<"Act"> | Date | string
    updatedAt?: DateTimeFilter<"Act"> | Date | string
    guild?: XOR<GuildNullableScalarRelationFilter, GuildWhereInput> | null
    calendarEvents?: CalendarEventListRelationFilter
  }

  export type ActOrderByWithRelationInput = {
    actId?: SortOrder
    name?: SortOrder
    bio?: SortOrderInput | SortOrder
    avatar?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    guild?: GuildOrderByWithRelationInput
    calendarEvents?: CalendarEventOrderByRelationAggregateInput
  }

  export type ActWhereUniqueInput = Prisma.AtLeast<{
    actId?: string
    AND?: ActWhereInput | ActWhereInput[]
    OR?: ActWhereInput[]
    NOT?: ActWhereInput | ActWhereInput[]
    name?: StringFilter<"Act"> | string
    bio?: StringNullableFilter<"Act"> | string | null
    avatar?: StringNullableFilter<"Act"> | string | null
    createdAt?: DateTimeFilter<"Act"> | Date | string
    updatedAt?: DateTimeFilter<"Act"> | Date | string
    guild?: XOR<GuildNullableScalarRelationFilter, GuildWhereInput> | null
    calendarEvents?: CalendarEventListRelationFilter
  }, "actId">

  export type ActOrderByWithAggregationInput = {
    actId?: SortOrder
    name?: SortOrder
    bio?: SortOrderInput | SortOrder
    avatar?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ActCountOrderByAggregateInput
    _max?: ActMaxOrderByAggregateInput
    _min?: ActMinOrderByAggregateInput
  }

  export type ActScalarWhereWithAggregatesInput = {
    AND?: ActScalarWhereWithAggregatesInput | ActScalarWhereWithAggregatesInput[]
    OR?: ActScalarWhereWithAggregatesInput[]
    NOT?: ActScalarWhereWithAggregatesInput | ActScalarWhereWithAggregatesInput[]
    actId?: StringWithAggregatesFilter<"Act"> | string
    name?: StringWithAggregatesFilter<"Act"> | string
    bio?: StringNullableWithAggregatesFilter<"Act"> | string | null
    avatar?: StringNullableWithAggregatesFilter<"Act"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Act"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Act"> | Date | string
  }

  export type VenueWhereInput = {
    AND?: VenueWhereInput | VenueWhereInput[]
    OR?: VenueWhereInput[]
    NOT?: VenueWhereInput | VenueWhereInput[]
    venueId?: StringFilter<"Venue"> | string
    name?: StringFilter<"Venue"> | string
    address?: StringNullableFilter<"Venue"> | string | null
    city?: StringNullableFilter<"Venue"> | string | null
    state?: StringNullableFilter<"Venue"> | string | null
    zipCode?: StringNullableFilter<"Venue"> | string | null
    avatar?: StringNullableFilter<"Venue"> | string | null
    createdAt?: DateTimeFilter<"Venue"> | Date | string
    updatedAt?: DateTimeFilter<"Venue"> | Date | string
    guild?: XOR<GuildNullableScalarRelationFilter, GuildWhereInput> | null
    calendarEvents?: CalendarEventListRelationFilter
  }

  export type VenueOrderByWithRelationInput = {
    venueId?: SortOrder
    name?: SortOrder
    address?: SortOrderInput | SortOrder
    city?: SortOrderInput | SortOrder
    state?: SortOrderInput | SortOrder
    zipCode?: SortOrderInput | SortOrder
    avatar?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    guild?: GuildOrderByWithRelationInput
    calendarEvents?: CalendarEventOrderByRelationAggregateInput
  }

  export type VenueWhereUniqueInput = Prisma.AtLeast<{
    venueId?: string
    AND?: VenueWhereInput | VenueWhereInput[]
    OR?: VenueWhereInput[]
    NOT?: VenueWhereInput | VenueWhereInput[]
    name?: StringFilter<"Venue"> | string
    address?: StringNullableFilter<"Venue"> | string | null
    city?: StringNullableFilter<"Venue"> | string | null
    state?: StringNullableFilter<"Venue"> | string | null
    zipCode?: StringNullableFilter<"Venue"> | string | null
    avatar?: StringNullableFilter<"Venue"> | string | null
    createdAt?: DateTimeFilter<"Venue"> | Date | string
    updatedAt?: DateTimeFilter<"Venue"> | Date | string
    guild?: XOR<GuildNullableScalarRelationFilter, GuildWhereInput> | null
    calendarEvents?: CalendarEventListRelationFilter
  }, "venueId">

  export type VenueOrderByWithAggregationInput = {
    venueId?: SortOrder
    name?: SortOrder
    address?: SortOrderInput | SortOrder
    city?: SortOrderInput | SortOrder
    state?: SortOrderInput | SortOrder
    zipCode?: SortOrderInput | SortOrder
    avatar?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: VenueCountOrderByAggregateInput
    _max?: VenueMaxOrderByAggregateInput
    _min?: VenueMinOrderByAggregateInput
  }

  export type VenueScalarWhereWithAggregatesInput = {
    AND?: VenueScalarWhereWithAggregatesInput | VenueScalarWhereWithAggregatesInput[]
    OR?: VenueScalarWhereWithAggregatesInput[]
    NOT?: VenueScalarWhereWithAggregatesInput | VenueScalarWhereWithAggregatesInput[]
    venueId?: StringWithAggregatesFilter<"Venue"> | string
    name?: StringWithAggregatesFilter<"Venue"> | string
    address?: StringNullableWithAggregatesFilter<"Venue"> | string | null
    city?: StringNullableWithAggregatesFilter<"Venue"> | string | null
    state?: StringNullableWithAggregatesFilter<"Venue"> | string | null
    zipCode?: StringNullableWithAggregatesFilter<"Venue"> | string | null
    avatar?: StringNullableWithAggregatesFilter<"Venue"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Venue"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Venue"> | Date | string
  }

  export type ClubWhereInput = {
    AND?: ClubWhereInput | ClubWhereInput[]
    OR?: ClubWhereInput[]
    NOT?: ClubWhereInput | ClubWhereInput[]
    clubId?: StringFilter<"Club"> | string
    name?: StringFilter<"Club"> | string
    description?: StringNullableFilter<"Club"> | string | null
    avatar?: StringNullableFilter<"Club"> | string | null
    createdAt?: DateTimeFilter<"Club"> | Date | string
    updatedAt?: DateTimeFilter<"Club"> | Date | string
    guild?: XOR<GuildNullableScalarRelationFilter, GuildWhereInput> | null
  }

  export type ClubOrderByWithRelationInput = {
    clubId?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    avatar?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    guild?: GuildOrderByWithRelationInput
  }

  export type ClubWhereUniqueInput = Prisma.AtLeast<{
    clubId?: string
    AND?: ClubWhereInput | ClubWhereInput[]
    OR?: ClubWhereInput[]
    NOT?: ClubWhereInput | ClubWhereInput[]
    name?: StringFilter<"Club"> | string
    description?: StringNullableFilter<"Club"> | string | null
    avatar?: StringNullableFilter<"Club"> | string | null
    createdAt?: DateTimeFilter<"Club"> | Date | string
    updatedAt?: DateTimeFilter<"Club"> | Date | string
    guild?: XOR<GuildNullableScalarRelationFilter, GuildWhereInput> | null
  }, "clubId">

  export type ClubOrderByWithAggregationInput = {
    clubId?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    avatar?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ClubCountOrderByAggregateInput
    _max?: ClubMaxOrderByAggregateInput
    _min?: ClubMinOrderByAggregateInput
  }

  export type ClubScalarWhereWithAggregatesInput = {
    AND?: ClubScalarWhereWithAggregatesInput | ClubScalarWhereWithAggregatesInput[]
    OR?: ClubScalarWhereWithAggregatesInput[]
    NOT?: ClubScalarWhereWithAggregatesInput | ClubScalarWhereWithAggregatesInput[]
    clubId?: StringWithAggregatesFilter<"Club"> | string
    name?: StringWithAggregatesFilter<"Club"> | string
    description?: StringNullableWithAggregatesFilter<"Club"> | string | null
    avatar?: StringNullableWithAggregatesFilter<"Club"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Club"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Club"> | Date | string
  }

  export type CalendarEventWhereInput = {
    AND?: CalendarEventWhereInput | CalendarEventWhereInput[]
    OR?: CalendarEventWhereInput[]
    NOT?: CalendarEventWhereInput | CalendarEventWhereInput[]
    eventId?: StringFilter<"CalendarEvent"> | string
    title?: StringNullableFilter<"CalendarEvent"> | string | null
    description?: StringNullableFilter<"CalendarEvent"> | string | null
    poster?: StringNullableFilter<"CalendarEvent"> | string | null
    startTime?: DateTimeFilter<"CalendarEvent"> | Date | string
    duration?: IntFilter<"CalendarEvent"> | number
    createdAt?: DateTimeFilter<"CalendarEvent"> | Date | string
    updatedAt?: DateTimeFilter<"CalendarEvent"> | Date | string
    venueId?: StringFilter<"CalendarEvent"> | string
    venue?: XOR<VenueScalarRelationFilter, VenueWhereInput>
    acts?: ActListRelationFilter
    feedActivities?: FeedActivityListRelationFilter
  }

  export type CalendarEventOrderByWithRelationInput = {
    eventId?: SortOrder
    title?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    poster?: SortOrderInput | SortOrder
    startTime?: SortOrder
    duration?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    venueId?: SortOrder
    venue?: VenueOrderByWithRelationInput
    acts?: ActOrderByRelationAggregateInput
    feedActivities?: FeedActivityOrderByRelationAggregateInput
  }

  export type CalendarEventWhereUniqueInput = Prisma.AtLeast<{
    eventId?: string
    AND?: CalendarEventWhereInput | CalendarEventWhereInput[]
    OR?: CalendarEventWhereInput[]
    NOT?: CalendarEventWhereInput | CalendarEventWhereInput[]
    title?: StringNullableFilter<"CalendarEvent"> | string | null
    description?: StringNullableFilter<"CalendarEvent"> | string | null
    poster?: StringNullableFilter<"CalendarEvent"> | string | null
    startTime?: DateTimeFilter<"CalendarEvent"> | Date | string
    duration?: IntFilter<"CalendarEvent"> | number
    createdAt?: DateTimeFilter<"CalendarEvent"> | Date | string
    updatedAt?: DateTimeFilter<"CalendarEvent"> | Date | string
    venueId?: StringFilter<"CalendarEvent"> | string
    venue?: XOR<VenueScalarRelationFilter, VenueWhereInput>
    acts?: ActListRelationFilter
    feedActivities?: FeedActivityListRelationFilter
  }, "eventId">

  export type CalendarEventOrderByWithAggregationInput = {
    eventId?: SortOrder
    title?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    poster?: SortOrderInput | SortOrder
    startTime?: SortOrder
    duration?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    venueId?: SortOrder
    _count?: CalendarEventCountOrderByAggregateInput
    _avg?: CalendarEventAvgOrderByAggregateInput
    _max?: CalendarEventMaxOrderByAggregateInput
    _min?: CalendarEventMinOrderByAggregateInput
    _sum?: CalendarEventSumOrderByAggregateInput
  }

  export type CalendarEventScalarWhereWithAggregatesInput = {
    AND?: CalendarEventScalarWhereWithAggregatesInput | CalendarEventScalarWhereWithAggregatesInput[]
    OR?: CalendarEventScalarWhereWithAggregatesInput[]
    NOT?: CalendarEventScalarWhereWithAggregatesInput | CalendarEventScalarWhereWithAggregatesInput[]
    eventId?: StringWithAggregatesFilter<"CalendarEvent"> | string
    title?: StringNullableWithAggregatesFilter<"CalendarEvent"> | string | null
    description?: StringNullableWithAggregatesFilter<"CalendarEvent"> | string | null
    poster?: StringNullableWithAggregatesFilter<"CalendarEvent"> | string | null
    startTime?: DateTimeWithAggregatesFilter<"CalendarEvent"> | Date | string
    duration?: IntWithAggregatesFilter<"CalendarEvent"> | number
    createdAt?: DateTimeWithAggregatesFilter<"CalendarEvent"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"CalendarEvent"> | Date | string
    venueId?: StringWithAggregatesFilter<"CalendarEvent"> | string
  }

  export type FeedActivityWhereInput = {
    AND?: FeedActivityWhereInput | FeedActivityWhereInput[]
    OR?: FeedActivityWhereInput[]
    NOT?: FeedActivityWhereInput | FeedActivityWhereInput[]
    activityId?: StringFilter<"FeedActivity"> | string
    activityType?: StringFilter<"FeedActivity"> | string
    createdAt?: DateTimeFilter<"FeedActivity"> | Date | string
    subjectType?: StringFilter<"FeedActivity"> | string
    subjectId?: StringFilter<"FeedActivity"> | string
    calendarEventId?: StringNullableFilter<"FeedActivity"> | string | null
    userId?: StringNullableFilter<"FeedActivity"> | string | null
    calendarEvent?: XOR<CalendarEventNullableScalarRelationFilter, CalendarEventWhereInput> | null
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }

  export type FeedActivityOrderByWithRelationInput = {
    activityId?: SortOrder
    activityType?: SortOrder
    createdAt?: SortOrder
    subjectType?: SortOrder
    subjectId?: SortOrder
    calendarEventId?: SortOrderInput | SortOrder
    userId?: SortOrderInput | SortOrder
    calendarEvent?: CalendarEventOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type FeedActivityWhereUniqueInput = Prisma.AtLeast<{
    activityId?: string
    AND?: FeedActivityWhereInput | FeedActivityWhereInput[]
    OR?: FeedActivityWhereInput[]
    NOT?: FeedActivityWhereInput | FeedActivityWhereInput[]
    activityType?: StringFilter<"FeedActivity"> | string
    createdAt?: DateTimeFilter<"FeedActivity"> | Date | string
    subjectType?: StringFilter<"FeedActivity"> | string
    subjectId?: StringFilter<"FeedActivity"> | string
    calendarEventId?: StringNullableFilter<"FeedActivity"> | string | null
    userId?: StringNullableFilter<"FeedActivity"> | string | null
    calendarEvent?: XOR<CalendarEventNullableScalarRelationFilter, CalendarEventWhereInput> | null
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }, "activityId">

  export type FeedActivityOrderByWithAggregationInput = {
    activityId?: SortOrder
    activityType?: SortOrder
    createdAt?: SortOrder
    subjectType?: SortOrder
    subjectId?: SortOrder
    calendarEventId?: SortOrderInput | SortOrder
    userId?: SortOrderInput | SortOrder
    _count?: FeedActivityCountOrderByAggregateInput
    _max?: FeedActivityMaxOrderByAggregateInput
    _min?: FeedActivityMinOrderByAggregateInput
  }

  export type FeedActivityScalarWhereWithAggregatesInput = {
    AND?: FeedActivityScalarWhereWithAggregatesInput | FeedActivityScalarWhereWithAggregatesInput[]
    OR?: FeedActivityScalarWhereWithAggregatesInput[]
    NOT?: FeedActivityScalarWhereWithAggregatesInput | FeedActivityScalarWhereWithAggregatesInput[]
    activityId?: StringWithAggregatesFilter<"FeedActivity"> | string
    activityType?: StringWithAggregatesFilter<"FeedActivity"> | string
    createdAt?: DateTimeWithAggregatesFilter<"FeedActivity"> | Date | string
    subjectType?: StringWithAggregatesFilter<"FeedActivity"> | string
    subjectId?: StringWithAggregatesFilter<"FeedActivity"> | string
    calendarEventId?: StringNullableWithAggregatesFilter<"FeedActivity"> | string | null
    userId?: StringNullableWithAggregatesFilter<"FeedActivity"> | string | null
  }

  export type GuildInvitationWhereInput = {
    AND?: GuildInvitationWhereInput | GuildInvitationWhereInput[]
    OR?: GuildInvitationWhereInput[]
    NOT?: GuildInvitationWhereInput | GuildInvitationWhereInput[]
    invitationId?: StringFilter<"GuildInvitation"> | string
    guildId?: StringFilter<"GuildInvitation"> | string
    invitedUserId?: StringFilter<"GuildInvitation"> | string
    invitedById?: StringNullableFilter<"GuildInvitation"> | string | null
    status?: EnumGuildInvitationStatusFilter<"GuildInvitation"> | $Enums.GuildInvitationStatus
    createdAt?: DateTimeFilter<"GuildInvitation"> | Date | string
    respondedAt?: DateTimeNullableFilter<"GuildInvitation"> | Date | string | null
    guild?: XOR<GuildScalarRelationFilter, GuildWhereInput>
    invitedUser?: XOR<UserScalarRelationFilter, UserWhereInput>
    invitedBy?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }

  export type GuildInvitationOrderByWithRelationInput = {
    invitationId?: SortOrder
    guildId?: SortOrder
    invitedUserId?: SortOrder
    invitedById?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    respondedAt?: SortOrderInput | SortOrder
    guild?: GuildOrderByWithRelationInput
    invitedUser?: UserOrderByWithRelationInput
    invitedBy?: UserOrderByWithRelationInput
  }

  export type GuildInvitationWhereUniqueInput = Prisma.AtLeast<{
    invitationId?: string
    guildId_invitedUserId?: GuildInvitationGuildIdInvitedUserIdCompoundUniqueInput
    AND?: GuildInvitationWhereInput | GuildInvitationWhereInput[]
    OR?: GuildInvitationWhereInput[]
    NOT?: GuildInvitationWhereInput | GuildInvitationWhereInput[]
    guildId?: StringFilter<"GuildInvitation"> | string
    invitedUserId?: StringFilter<"GuildInvitation"> | string
    invitedById?: StringNullableFilter<"GuildInvitation"> | string | null
    status?: EnumGuildInvitationStatusFilter<"GuildInvitation"> | $Enums.GuildInvitationStatus
    createdAt?: DateTimeFilter<"GuildInvitation"> | Date | string
    respondedAt?: DateTimeNullableFilter<"GuildInvitation"> | Date | string | null
    guild?: XOR<GuildScalarRelationFilter, GuildWhereInput>
    invitedUser?: XOR<UserScalarRelationFilter, UserWhereInput>
    invitedBy?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }, "invitationId" | "guildId_invitedUserId">

  export type GuildInvitationOrderByWithAggregationInput = {
    invitationId?: SortOrder
    guildId?: SortOrder
    invitedUserId?: SortOrder
    invitedById?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    respondedAt?: SortOrderInput | SortOrder
    _count?: GuildInvitationCountOrderByAggregateInput
    _max?: GuildInvitationMaxOrderByAggregateInput
    _min?: GuildInvitationMinOrderByAggregateInput
  }

  export type GuildInvitationScalarWhereWithAggregatesInput = {
    AND?: GuildInvitationScalarWhereWithAggregatesInput | GuildInvitationScalarWhereWithAggregatesInput[]
    OR?: GuildInvitationScalarWhereWithAggregatesInput[]
    NOT?: GuildInvitationScalarWhereWithAggregatesInput | GuildInvitationScalarWhereWithAggregatesInput[]
    invitationId?: StringWithAggregatesFilter<"GuildInvitation"> | string
    guildId?: StringWithAggregatesFilter<"GuildInvitation"> | string
    invitedUserId?: StringWithAggregatesFilter<"GuildInvitation"> | string
    invitedById?: StringNullableWithAggregatesFilter<"GuildInvitation"> | string | null
    status?: EnumGuildInvitationStatusWithAggregatesFilter<"GuildInvitation"> | $Enums.GuildInvitationStatus
    createdAt?: DateTimeWithAggregatesFilter<"GuildInvitation"> | Date | string
    respondedAt?: DateTimeNullableWithAggregatesFilter<"GuildInvitation"> | Date | string | null
  }

  export type UserCreateInput = {
    userId?: string
    email: string
    displayName?: string | null
    avatar?: string | null
    firebaseUid?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdGuilds?: GuildCreateNestedManyWithoutCreatedByInput
    ownedGuilds?: GuildCreateNestedManyWithoutCurrentOwnerInput
    memberOfGuilds?: GuildCreateNestedManyWithoutMembersInput
    follows?: FollowCreateNestedManyWithoutUserInput
    followedBy?: FollowCreateNestedManyWithoutFollowedUserInput
    feedActivities?: FeedActivityCreateNestedManyWithoutUserInput
    sentInvitations?: GuildInvitationCreateNestedManyWithoutInvitedByInput
    receivedInvitations?: GuildInvitationCreateNestedManyWithoutInvitedUserInput
  }

  export type UserUncheckedCreateInput = {
    userId?: string
    email: string
    displayName?: string | null
    avatar?: string | null
    firebaseUid?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdGuilds?: GuildUncheckedCreateNestedManyWithoutCreatedByInput
    ownedGuilds?: GuildUncheckedCreateNestedManyWithoutCurrentOwnerInput
    memberOfGuilds?: GuildUncheckedCreateNestedManyWithoutMembersInput
    follows?: FollowUncheckedCreateNestedManyWithoutUserInput
    followedBy?: FollowUncheckedCreateNestedManyWithoutFollowedUserInput
    feedActivities?: FeedActivityUncheckedCreateNestedManyWithoutUserInput
    sentInvitations?: GuildInvitationUncheckedCreateNestedManyWithoutInvitedByInput
    receivedInvitations?: GuildInvitationUncheckedCreateNestedManyWithoutInvitedUserInput
  }

  export type UserUpdateInput = {
    userId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    firebaseUid?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdGuilds?: GuildUpdateManyWithoutCreatedByNestedInput
    ownedGuilds?: GuildUpdateManyWithoutCurrentOwnerNestedInput
    memberOfGuilds?: GuildUpdateManyWithoutMembersNestedInput
    follows?: FollowUpdateManyWithoutUserNestedInput
    followedBy?: FollowUpdateManyWithoutFollowedUserNestedInput
    feedActivities?: FeedActivityUpdateManyWithoutUserNestedInput
    sentInvitations?: GuildInvitationUpdateManyWithoutInvitedByNestedInput
    receivedInvitations?: GuildInvitationUpdateManyWithoutInvitedUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    userId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    firebaseUid?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdGuilds?: GuildUncheckedUpdateManyWithoutCreatedByNestedInput
    ownedGuilds?: GuildUncheckedUpdateManyWithoutCurrentOwnerNestedInput
    memberOfGuilds?: GuildUncheckedUpdateManyWithoutMembersNestedInput
    follows?: FollowUncheckedUpdateManyWithoutUserNestedInput
    followedBy?: FollowUncheckedUpdateManyWithoutFollowedUserNestedInput
    feedActivities?: FeedActivityUncheckedUpdateManyWithoutUserNestedInput
    sentInvitations?: GuildInvitationUncheckedUpdateManyWithoutInvitedByNestedInput
    receivedInvitations?: GuildInvitationUncheckedUpdateManyWithoutInvitedUserNestedInput
  }

  export type UserCreateManyInput = {
    userId?: string
    email: string
    displayName?: string | null
    avatar?: string | null
    firebaseUid?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    userId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    firebaseUid?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    userId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    firebaseUid?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FollowCreateInput = {
    followId?: string
    entityType: $Enums.FollowEntityType
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutFollowsInput
    followedUser?: UserCreateNestedOneWithoutFollowedByInput
    tag?: TagCreateNestedOneWithoutFollowsInput
    guild?: GuildCreateNestedOneWithoutFollowsInput
  }

  export type FollowUncheckedCreateInput = {
    followId?: string
    userId: string
    entityType: $Enums.FollowEntityType
    followedUserId?: string | null
    tagId?: string | null
    guildId?: string | null
    createdAt?: Date | string
  }

  export type FollowUpdateInput = {
    followId?: StringFieldUpdateOperationsInput | string
    entityType?: EnumFollowEntityTypeFieldUpdateOperationsInput | $Enums.FollowEntityType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutFollowsNestedInput
    followedUser?: UserUpdateOneWithoutFollowedByNestedInput
    tag?: TagUpdateOneWithoutFollowsNestedInput
    guild?: GuildUpdateOneWithoutFollowsNestedInput
  }

  export type FollowUncheckedUpdateInput = {
    followId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    entityType?: EnumFollowEntityTypeFieldUpdateOperationsInput | $Enums.FollowEntityType
    followedUserId?: NullableStringFieldUpdateOperationsInput | string | null
    tagId?: NullableStringFieldUpdateOperationsInput | string | null
    guildId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FollowCreateManyInput = {
    followId?: string
    userId: string
    entityType: $Enums.FollowEntityType
    followedUserId?: string | null
    tagId?: string | null
    guildId?: string | null
    createdAt?: Date | string
  }

  export type FollowUpdateManyMutationInput = {
    followId?: StringFieldUpdateOperationsInput | string
    entityType?: EnumFollowEntityTypeFieldUpdateOperationsInput | $Enums.FollowEntityType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FollowUncheckedUpdateManyInput = {
    followId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    entityType?: EnumFollowEntityTypeFieldUpdateOperationsInput | $Enums.FollowEntityType
    followedUserId?: NullableStringFieldUpdateOperationsInput | string | null
    tagId?: NullableStringFieldUpdateOperationsInput | string | null
    guildId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TagCreateInput = {
    tagId?: string
    category: string
    value: string
    follows?: FollowCreateNestedManyWithoutTagInput
  }

  export type TagUncheckedCreateInput = {
    tagId?: string
    category: string
    value: string
    follows?: FollowUncheckedCreateNestedManyWithoutTagInput
  }

  export type TagUpdateInput = {
    tagId?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    follows?: FollowUpdateManyWithoutTagNestedInput
  }

  export type TagUncheckedUpdateInput = {
    tagId?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    follows?: FollowUncheckedUpdateManyWithoutTagNestedInput
  }

  export type TagCreateManyInput = {
    tagId?: string
    category: string
    value: string
  }

  export type TagUpdateManyMutationInput = {
    tagId?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
  }

  export type TagUncheckedUpdateManyInput = {
    tagId?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
  }

  export type GuildCreateInput = {
    guildId?: string
    name: string
    guildType: $Enums.GuildType
    createdAt?: Date | string
    createdBy?: UserCreateNestedOneWithoutCreatedGuildsInput
    currentOwner: UserCreateNestedOneWithoutOwnedGuildsInput
    members?: UserCreateNestedManyWithoutMemberOfGuildsInput
    act?: ActCreateNestedOneWithoutGuildInput
    venue?: VenueCreateNestedOneWithoutGuildInput
    club?: ClubCreateNestedOneWithoutGuildInput
    follows?: FollowCreateNestedManyWithoutGuildInput
    invitations?: GuildInvitationCreateNestedManyWithoutGuildInput
  }

  export type GuildUncheckedCreateInput = {
    guildId?: string
    name: string
    guildType: $Enums.GuildType
    createdAt?: Date | string
    createdById?: string | null
    currentOwnerId: string
    actId?: string | null
    venueId?: string | null
    clubId?: string | null
    members?: UserUncheckedCreateNestedManyWithoutMemberOfGuildsInput
    follows?: FollowUncheckedCreateNestedManyWithoutGuildInput
    invitations?: GuildInvitationUncheckedCreateNestedManyWithoutGuildInput
  }

  export type GuildUpdateInput = {
    guildId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    guildType?: EnumGuildTypeFieldUpdateOperationsInput | $Enums.GuildType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: UserUpdateOneWithoutCreatedGuildsNestedInput
    currentOwner?: UserUpdateOneRequiredWithoutOwnedGuildsNestedInput
    members?: UserUpdateManyWithoutMemberOfGuildsNestedInput
    act?: ActUpdateOneWithoutGuildNestedInput
    venue?: VenueUpdateOneWithoutGuildNestedInput
    club?: ClubUpdateOneWithoutGuildNestedInput
    follows?: FollowUpdateManyWithoutGuildNestedInput
    invitations?: GuildInvitationUpdateManyWithoutGuildNestedInput
  }

  export type GuildUncheckedUpdateInput = {
    guildId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    guildType?: EnumGuildTypeFieldUpdateOperationsInput | $Enums.GuildType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdById?: NullableStringFieldUpdateOperationsInput | string | null
    currentOwnerId?: StringFieldUpdateOperationsInput | string
    actId?: NullableStringFieldUpdateOperationsInput | string | null
    venueId?: NullableStringFieldUpdateOperationsInput | string | null
    clubId?: NullableStringFieldUpdateOperationsInput | string | null
    members?: UserUncheckedUpdateManyWithoutMemberOfGuildsNestedInput
    follows?: FollowUncheckedUpdateManyWithoutGuildNestedInput
    invitations?: GuildInvitationUncheckedUpdateManyWithoutGuildNestedInput
  }

  export type GuildCreateManyInput = {
    guildId?: string
    name: string
    guildType: $Enums.GuildType
    createdAt?: Date | string
    createdById?: string | null
    currentOwnerId: string
    actId?: string | null
    venueId?: string | null
    clubId?: string | null
  }

  export type GuildUpdateManyMutationInput = {
    guildId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    guildType?: EnumGuildTypeFieldUpdateOperationsInput | $Enums.GuildType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GuildUncheckedUpdateManyInput = {
    guildId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    guildType?: EnumGuildTypeFieldUpdateOperationsInput | $Enums.GuildType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdById?: NullableStringFieldUpdateOperationsInput | string | null
    currentOwnerId?: StringFieldUpdateOperationsInput | string
    actId?: NullableStringFieldUpdateOperationsInput | string | null
    venueId?: NullableStringFieldUpdateOperationsInput | string | null
    clubId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ActCreateInput = {
    actId?: string
    name: string
    bio?: string | null
    avatar?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    guild?: GuildCreateNestedOneWithoutActInput
    calendarEvents?: CalendarEventCreateNestedManyWithoutActsInput
  }

  export type ActUncheckedCreateInput = {
    actId?: string
    name: string
    bio?: string | null
    avatar?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    guild?: GuildUncheckedCreateNestedOneWithoutActInput
    calendarEvents?: CalendarEventUncheckedCreateNestedManyWithoutActsInput
  }

  export type ActUpdateInput = {
    actId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    guild?: GuildUpdateOneWithoutActNestedInput
    calendarEvents?: CalendarEventUpdateManyWithoutActsNestedInput
  }

  export type ActUncheckedUpdateInput = {
    actId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    guild?: GuildUncheckedUpdateOneWithoutActNestedInput
    calendarEvents?: CalendarEventUncheckedUpdateManyWithoutActsNestedInput
  }

  export type ActCreateManyInput = {
    actId?: string
    name: string
    bio?: string | null
    avatar?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ActUpdateManyMutationInput = {
    actId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActUncheckedUpdateManyInput = {
    actId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VenueCreateInput = {
    venueId?: string
    name: string
    address?: string | null
    city?: string | null
    state?: string | null
    zipCode?: string | null
    avatar?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    guild?: GuildCreateNestedOneWithoutVenueInput
    calendarEvents?: CalendarEventCreateNestedManyWithoutVenueInput
  }

  export type VenueUncheckedCreateInput = {
    venueId?: string
    name: string
    address?: string | null
    city?: string | null
    state?: string | null
    zipCode?: string | null
    avatar?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    guild?: GuildUncheckedCreateNestedOneWithoutVenueInput
    calendarEvents?: CalendarEventUncheckedCreateNestedManyWithoutVenueInput
  }

  export type VenueUpdateInput = {
    venueId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    zipCode?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    guild?: GuildUpdateOneWithoutVenueNestedInput
    calendarEvents?: CalendarEventUpdateManyWithoutVenueNestedInput
  }

  export type VenueUncheckedUpdateInput = {
    venueId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    zipCode?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    guild?: GuildUncheckedUpdateOneWithoutVenueNestedInput
    calendarEvents?: CalendarEventUncheckedUpdateManyWithoutVenueNestedInput
  }

  export type VenueCreateManyInput = {
    venueId?: string
    name: string
    address?: string | null
    city?: string | null
    state?: string | null
    zipCode?: string | null
    avatar?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VenueUpdateManyMutationInput = {
    venueId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    zipCode?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VenueUncheckedUpdateManyInput = {
    venueId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    zipCode?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClubCreateInput = {
    clubId?: string
    name: string
    description?: string | null
    avatar?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    guild?: GuildCreateNestedOneWithoutClubInput
  }

  export type ClubUncheckedCreateInput = {
    clubId?: string
    name: string
    description?: string | null
    avatar?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    guild?: GuildUncheckedCreateNestedOneWithoutClubInput
  }

  export type ClubUpdateInput = {
    clubId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    guild?: GuildUpdateOneWithoutClubNestedInput
  }

  export type ClubUncheckedUpdateInput = {
    clubId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    guild?: GuildUncheckedUpdateOneWithoutClubNestedInput
  }

  export type ClubCreateManyInput = {
    clubId?: string
    name: string
    description?: string | null
    avatar?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ClubUpdateManyMutationInput = {
    clubId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClubUncheckedUpdateManyInput = {
    clubId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CalendarEventCreateInput = {
    eventId?: string
    title?: string | null
    description?: string | null
    poster?: string | null
    startTime: Date | string
    duration: number
    createdAt?: Date | string
    updatedAt?: Date | string
    venue: VenueCreateNestedOneWithoutCalendarEventsInput
    acts?: ActCreateNestedManyWithoutCalendarEventsInput
    feedActivities?: FeedActivityCreateNestedManyWithoutCalendarEventInput
  }

  export type CalendarEventUncheckedCreateInput = {
    eventId?: string
    title?: string | null
    description?: string | null
    poster?: string | null
    startTime: Date | string
    duration: number
    createdAt?: Date | string
    updatedAt?: Date | string
    venueId: string
    acts?: ActUncheckedCreateNestedManyWithoutCalendarEventsInput
    feedActivities?: FeedActivityUncheckedCreateNestedManyWithoutCalendarEventInput
  }

  export type CalendarEventUpdateInput = {
    eventId?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    poster?: NullableStringFieldUpdateOperationsInput | string | null
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    duration?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    venue?: VenueUpdateOneRequiredWithoutCalendarEventsNestedInput
    acts?: ActUpdateManyWithoutCalendarEventsNestedInput
    feedActivities?: FeedActivityUpdateManyWithoutCalendarEventNestedInput
  }

  export type CalendarEventUncheckedUpdateInput = {
    eventId?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    poster?: NullableStringFieldUpdateOperationsInput | string | null
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    duration?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    venueId?: StringFieldUpdateOperationsInput | string
    acts?: ActUncheckedUpdateManyWithoutCalendarEventsNestedInput
    feedActivities?: FeedActivityUncheckedUpdateManyWithoutCalendarEventNestedInput
  }

  export type CalendarEventCreateManyInput = {
    eventId?: string
    title?: string | null
    description?: string | null
    poster?: string | null
    startTime: Date | string
    duration: number
    createdAt?: Date | string
    updatedAt?: Date | string
    venueId: string
  }

  export type CalendarEventUpdateManyMutationInput = {
    eventId?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    poster?: NullableStringFieldUpdateOperationsInput | string | null
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    duration?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CalendarEventUncheckedUpdateManyInput = {
    eventId?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    poster?: NullableStringFieldUpdateOperationsInput | string | null
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    duration?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    venueId?: StringFieldUpdateOperationsInput | string
  }

  export type FeedActivityCreateInput = {
    activityId?: string
    activityType: string
    createdAt?: Date | string
    subjectType: string
    subjectId: string
    calendarEvent?: CalendarEventCreateNestedOneWithoutFeedActivitiesInput
    user?: UserCreateNestedOneWithoutFeedActivitiesInput
  }

  export type FeedActivityUncheckedCreateInput = {
    activityId?: string
    activityType: string
    createdAt?: Date | string
    subjectType: string
    subjectId: string
    calendarEventId?: string | null
    userId?: string | null
  }

  export type FeedActivityUpdateInput = {
    activityId?: StringFieldUpdateOperationsInput | string
    activityType?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subjectType?: StringFieldUpdateOperationsInput | string
    subjectId?: StringFieldUpdateOperationsInput | string
    calendarEvent?: CalendarEventUpdateOneWithoutFeedActivitiesNestedInput
    user?: UserUpdateOneWithoutFeedActivitiesNestedInput
  }

  export type FeedActivityUncheckedUpdateInput = {
    activityId?: StringFieldUpdateOperationsInput | string
    activityType?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subjectType?: StringFieldUpdateOperationsInput | string
    subjectId?: StringFieldUpdateOperationsInput | string
    calendarEventId?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type FeedActivityCreateManyInput = {
    activityId?: string
    activityType: string
    createdAt?: Date | string
    subjectType: string
    subjectId: string
    calendarEventId?: string | null
    userId?: string | null
  }

  export type FeedActivityUpdateManyMutationInput = {
    activityId?: StringFieldUpdateOperationsInput | string
    activityType?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subjectType?: StringFieldUpdateOperationsInput | string
    subjectId?: StringFieldUpdateOperationsInput | string
  }

  export type FeedActivityUncheckedUpdateManyInput = {
    activityId?: StringFieldUpdateOperationsInput | string
    activityType?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subjectType?: StringFieldUpdateOperationsInput | string
    subjectId?: StringFieldUpdateOperationsInput | string
    calendarEventId?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type GuildInvitationCreateInput = {
    invitationId?: string
    status?: $Enums.GuildInvitationStatus
    createdAt?: Date | string
    respondedAt?: Date | string | null
    guild: GuildCreateNestedOneWithoutInvitationsInput
    invitedUser: UserCreateNestedOneWithoutReceivedInvitationsInput
    invitedBy?: UserCreateNestedOneWithoutSentInvitationsInput
  }

  export type GuildInvitationUncheckedCreateInput = {
    invitationId?: string
    guildId: string
    invitedUserId: string
    invitedById?: string | null
    status?: $Enums.GuildInvitationStatus
    createdAt?: Date | string
    respondedAt?: Date | string | null
  }

  export type GuildInvitationUpdateInput = {
    invitationId?: StringFieldUpdateOperationsInput | string
    status?: EnumGuildInvitationStatusFieldUpdateOperationsInput | $Enums.GuildInvitationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    respondedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    guild?: GuildUpdateOneRequiredWithoutInvitationsNestedInput
    invitedUser?: UserUpdateOneRequiredWithoutReceivedInvitationsNestedInput
    invitedBy?: UserUpdateOneWithoutSentInvitationsNestedInput
  }

  export type GuildInvitationUncheckedUpdateInput = {
    invitationId?: StringFieldUpdateOperationsInput | string
    guildId?: StringFieldUpdateOperationsInput | string
    invitedUserId?: StringFieldUpdateOperationsInput | string
    invitedById?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumGuildInvitationStatusFieldUpdateOperationsInput | $Enums.GuildInvitationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    respondedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type GuildInvitationCreateManyInput = {
    invitationId?: string
    guildId: string
    invitedUserId: string
    invitedById?: string | null
    status?: $Enums.GuildInvitationStatus
    createdAt?: Date | string
    respondedAt?: Date | string | null
  }

  export type GuildInvitationUpdateManyMutationInput = {
    invitationId?: StringFieldUpdateOperationsInput | string
    status?: EnumGuildInvitationStatusFieldUpdateOperationsInput | $Enums.GuildInvitationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    respondedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type GuildInvitationUncheckedUpdateManyInput = {
    invitationId?: StringFieldUpdateOperationsInput | string
    guildId?: StringFieldUpdateOperationsInput | string
    invitedUserId?: StringFieldUpdateOperationsInput | string
    invitedById?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumGuildInvitationStatusFieldUpdateOperationsInput | $Enums.GuildInvitationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    respondedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type GuildListRelationFilter = {
    every?: GuildWhereInput
    some?: GuildWhereInput
    none?: GuildWhereInput
  }

  export type FollowListRelationFilter = {
    every?: FollowWhereInput
    some?: FollowWhereInput
    none?: FollowWhereInput
  }

  export type FeedActivityListRelationFilter = {
    every?: FeedActivityWhereInput
    some?: FeedActivityWhereInput
    none?: FeedActivityWhereInput
  }

  export type GuildInvitationListRelationFilter = {
    every?: GuildInvitationWhereInput
    some?: GuildInvitationWhereInput
    none?: GuildInvitationWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type GuildOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type FollowOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type FeedActivityOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type GuildInvitationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    userId?: SortOrder
    email?: SortOrder
    displayName?: SortOrder
    avatar?: SortOrder
    firebaseUid?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    userId?: SortOrder
    email?: SortOrder
    displayName?: SortOrder
    avatar?: SortOrder
    firebaseUid?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    userId?: SortOrder
    email?: SortOrder
    displayName?: SortOrder
    avatar?: SortOrder
    firebaseUid?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type EnumFollowEntityTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.FollowEntityType | EnumFollowEntityTypeFieldRefInput<$PrismaModel>
    in?: $Enums.FollowEntityType[] | ListEnumFollowEntityTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.FollowEntityType[] | ListEnumFollowEntityTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumFollowEntityTypeFilter<$PrismaModel> | $Enums.FollowEntityType
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type TagNullableScalarRelationFilter = {
    is?: TagWhereInput | null
    isNot?: TagWhereInput | null
  }

  export type GuildNullableScalarRelationFilter = {
    is?: GuildWhereInput | null
    isNot?: GuildWhereInput | null
  }

  export type FollowUserIdEntityTypeFollowedUserIdTagIdGuildIdCompoundUniqueInput = {
    userId: string
    entityType: $Enums.FollowEntityType
    followedUserId: string
    tagId: string
    guildId: string
  }

  export type FollowCountOrderByAggregateInput = {
    followId?: SortOrder
    userId?: SortOrder
    entityType?: SortOrder
    followedUserId?: SortOrder
    tagId?: SortOrder
    guildId?: SortOrder
    createdAt?: SortOrder
  }

  export type FollowMaxOrderByAggregateInput = {
    followId?: SortOrder
    userId?: SortOrder
    entityType?: SortOrder
    followedUserId?: SortOrder
    tagId?: SortOrder
    guildId?: SortOrder
    createdAt?: SortOrder
  }

  export type FollowMinOrderByAggregateInput = {
    followId?: SortOrder
    userId?: SortOrder
    entityType?: SortOrder
    followedUserId?: SortOrder
    tagId?: SortOrder
    guildId?: SortOrder
    createdAt?: SortOrder
  }

  export type EnumFollowEntityTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.FollowEntityType | EnumFollowEntityTypeFieldRefInput<$PrismaModel>
    in?: $Enums.FollowEntityType[] | ListEnumFollowEntityTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.FollowEntityType[] | ListEnumFollowEntityTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumFollowEntityTypeWithAggregatesFilter<$PrismaModel> | $Enums.FollowEntityType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumFollowEntityTypeFilter<$PrismaModel>
    _max?: NestedEnumFollowEntityTypeFilter<$PrismaModel>
  }

  export type TagCategoryValueCompoundUniqueInput = {
    category: string
    value: string
  }

  export type TagCountOrderByAggregateInput = {
    tagId?: SortOrder
    category?: SortOrder
    value?: SortOrder
  }

  export type TagMaxOrderByAggregateInput = {
    tagId?: SortOrder
    category?: SortOrder
    value?: SortOrder
  }

  export type TagMinOrderByAggregateInput = {
    tagId?: SortOrder
    category?: SortOrder
    value?: SortOrder
  }

  export type EnumGuildTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.GuildType | EnumGuildTypeFieldRefInput<$PrismaModel>
    in?: $Enums.GuildType[] | ListEnumGuildTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.GuildType[] | ListEnumGuildTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumGuildTypeFilter<$PrismaModel> | $Enums.GuildType
  }

  export type UserListRelationFilter = {
    every?: UserWhereInput
    some?: UserWhereInput
    none?: UserWhereInput
  }

  export type ActNullableScalarRelationFilter = {
    is?: ActWhereInput | null
    isNot?: ActWhereInput | null
  }

  export type VenueNullableScalarRelationFilter = {
    is?: VenueWhereInput | null
    isNot?: VenueWhereInput | null
  }

  export type ClubNullableScalarRelationFilter = {
    is?: ClubWhereInput | null
    isNot?: ClubWhereInput | null
  }

  export type UserOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type GuildCountOrderByAggregateInput = {
    guildId?: SortOrder
    name?: SortOrder
    guildType?: SortOrder
    createdAt?: SortOrder
    createdById?: SortOrder
    currentOwnerId?: SortOrder
    actId?: SortOrder
    venueId?: SortOrder
    clubId?: SortOrder
  }

  export type GuildMaxOrderByAggregateInput = {
    guildId?: SortOrder
    name?: SortOrder
    guildType?: SortOrder
    createdAt?: SortOrder
    createdById?: SortOrder
    currentOwnerId?: SortOrder
    actId?: SortOrder
    venueId?: SortOrder
    clubId?: SortOrder
  }

  export type GuildMinOrderByAggregateInput = {
    guildId?: SortOrder
    name?: SortOrder
    guildType?: SortOrder
    createdAt?: SortOrder
    createdById?: SortOrder
    currentOwnerId?: SortOrder
    actId?: SortOrder
    venueId?: SortOrder
    clubId?: SortOrder
  }

  export type EnumGuildTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.GuildType | EnumGuildTypeFieldRefInput<$PrismaModel>
    in?: $Enums.GuildType[] | ListEnumGuildTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.GuildType[] | ListEnumGuildTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumGuildTypeWithAggregatesFilter<$PrismaModel> | $Enums.GuildType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumGuildTypeFilter<$PrismaModel>
    _max?: NestedEnumGuildTypeFilter<$PrismaModel>
  }

  export type CalendarEventListRelationFilter = {
    every?: CalendarEventWhereInput
    some?: CalendarEventWhereInput
    none?: CalendarEventWhereInput
  }

  export type CalendarEventOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ActCountOrderByAggregateInput = {
    actId?: SortOrder
    name?: SortOrder
    bio?: SortOrder
    avatar?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ActMaxOrderByAggregateInput = {
    actId?: SortOrder
    name?: SortOrder
    bio?: SortOrder
    avatar?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ActMinOrderByAggregateInput = {
    actId?: SortOrder
    name?: SortOrder
    bio?: SortOrder
    avatar?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VenueCountOrderByAggregateInput = {
    venueId?: SortOrder
    name?: SortOrder
    address?: SortOrder
    city?: SortOrder
    state?: SortOrder
    zipCode?: SortOrder
    avatar?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VenueMaxOrderByAggregateInput = {
    venueId?: SortOrder
    name?: SortOrder
    address?: SortOrder
    city?: SortOrder
    state?: SortOrder
    zipCode?: SortOrder
    avatar?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VenueMinOrderByAggregateInput = {
    venueId?: SortOrder
    name?: SortOrder
    address?: SortOrder
    city?: SortOrder
    state?: SortOrder
    zipCode?: SortOrder
    avatar?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ClubCountOrderByAggregateInput = {
    clubId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    avatar?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ClubMaxOrderByAggregateInput = {
    clubId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    avatar?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ClubMinOrderByAggregateInput = {
    clubId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    avatar?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type VenueScalarRelationFilter = {
    is?: VenueWhereInput
    isNot?: VenueWhereInput
  }

  export type ActListRelationFilter = {
    every?: ActWhereInput
    some?: ActWhereInput
    none?: ActWhereInput
  }

  export type ActOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CalendarEventCountOrderByAggregateInput = {
    eventId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    poster?: SortOrder
    startTime?: SortOrder
    duration?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    venueId?: SortOrder
  }

  export type CalendarEventAvgOrderByAggregateInput = {
    duration?: SortOrder
  }

  export type CalendarEventMaxOrderByAggregateInput = {
    eventId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    poster?: SortOrder
    startTime?: SortOrder
    duration?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    venueId?: SortOrder
  }

  export type CalendarEventMinOrderByAggregateInput = {
    eventId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    poster?: SortOrder
    startTime?: SortOrder
    duration?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    venueId?: SortOrder
  }

  export type CalendarEventSumOrderByAggregateInput = {
    duration?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type CalendarEventNullableScalarRelationFilter = {
    is?: CalendarEventWhereInput | null
    isNot?: CalendarEventWhereInput | null
  }

  export type FeedActivityCountOrderByAggregateInput = {
    activityId?: SortOrder
    activityType?: SortOrder
    createdAt?: SortOrder
    subjectType?: SortOrder
    subjectId?: SortOrder
    calendarEventId?: SortOrder
    userId?: SortOrder
  }

  export type FeedActivityMaxOrderByAggregateInput = {
    activityId?: SortOrder
    activityType?: SortOrder
    createdAt?: SortOrder
    subjectType?: SortOrder
    subjectId?: SortOrder
    calendarEventId?: SortOrder
    userId?: SortOrder
  }

  export type FeedActivityMinOrderByAggregateInput = {
    activityId?: SortOrder
    activityType?: SortOrder
    createdAt?: SortOrder
    subjectType?: SortOrder
    subjectId?: SortOrder
    calendarEventId?: SortOrder
    userId?: SortOrder
  }

  export type EnumGuildInvitationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.GuildInvitationStatus | EnumGuildInvitationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.GuildInvitationStatus[] | ListEnumGuildInvitationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.GuildInvitationStatus[] | ListEnumGuildInvitationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumGuildInvitationStatusFilter<$PrismaModel> | $Enums.GuildInvitationStatus
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type GuildScalarRelationFilter = {
    is?: GuildWhereInput
    isNot?: GuildWhereInput
  }

  export type GuildInvitationGuildIdInvitedUserIdCompoundUniqueInput = {
    guildId: string
    invitedUserId: string
  }

  export type GuildInvitationCountOrderByAggregateInput = {
    invitationId?: SortOrder
    guildId?: SortOrder
    invitedUserId?: SortOrder
    invitedById?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    respondedAt?: SortOrder
  }

  export type GuildInvitationMaxOrderByAggregateInput = {
    invitationId?: SortOrder
    guildId?: SortOrder
    invitedUserId?: SortOrder
    invitedById?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    respondedAt?: SortOrder
  }

  export type GuildInvitationMinOrderByAggregateInput = {
    invitationId?: SortOrder
    guildId?: SortOrder
    invitedUserId?: SortOrder
    invitedById?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    respondedAt?: SortOrder
  }

  export type EnumGuildInvitationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.GuildInvitationStatus | EnumGuildInvitationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.GuildInvitationStatus[] | ListEnumGuildInvitationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.GuildInvitationStatus[] | ListEnumGuildInvitationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumGuildInvitationStatusWithAggregatesFilter<$PrismaModel> | $Enums.GuildInvitationStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumGuildInvitationStatusFilter<$PrismaModel>
    _max?: NestedEnumGuildInvitationStatusFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type GuildCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<GuildCreateWithoutCreatedByInput, GuildUncheckedCreateWithoutCreatedByInput> | GuildCreateWithoutCreatedByInput[] | GuildUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: GuildCreateOrConnectWithoutCreatedByInput | GuildCreateOrConnectWithoutCreatedByInput[]
    createMany?: GuildCreateManyCreatedByInputEnvelope
    connect?: GuildWhereUniqueInput | GuildWhereUniqueInput[]
  }

  export type GuildCreateNestedManyWithoutCurrentOwnerInput = {
    create?: XOR<GuildCreateWithoutCurrentOwnerInput, GuildUncheckedCreateWithoutCurrentOwnerInput> | GuildCreateWithoutCurrentOwnerInput[] | GuildUncheckedCreateWithoutCurrentOwnerInput[]
    connectOrCreate?: GuildCreateOrConnectWithoutCurrentOwnerInput | GuildCreateOrConnectWithoutCurrentOwnerInput[]
    createMany?: GuildCreateManyCurrentOwnerInputEnvelope
    connect?: GuildWhereUniqueInput | GuildWhereUniqueInput[]
  }

  export type GuildCreateNestedManyWithoutMembersInput = {
    create?: XOR<GuildCreateWithoutMembersInput, GuildUncheckedCreateWithoutMembersInput> | GuildCreateWithoutMembersInput[] | GuildUncheckedCreateWithoutMembersInput[]
    connectOrCreate?: GuildCreateOrConnectWithoutMembersInput | GuildCreateOrConnectWithoutMembersInput[]
    connect?: GuildWhereUniqueInput | GuildWhereUniqueInput[]
  }

  export type FollowCreateNestedManyWithoutUserInput = {
    create?: XOR<FollowCreateWithoutUserInput, FollowUncheckedCreateWithoutUserInput> | FollowCreateWithoutUserInput[] | FollowUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FollowCreateOrConnectWithoutUserInput | FollowCreateOrConnectWithoutUserInput[]
    createMany?: FollowCreateManyUserInputEnvelope
    connect?: FollowWhereUniqueInput | FollowWhereUniqueInput[]
  }

  export type FollowCreateNestedManyWithoutFollowedUserInput = {
    create?: XOR<FollowCreateWithoutFollowedUserInput, FollowUncheckedCreateWithoutFollowedUserInput> | FollowCreateWithoutFollowedUserInput[] | FollowUncheckedCreateWithoutFollowedUserInput[]
    connectOrCreate?: FollowCreateOrConnectWithoutFollowedUserInput | FollowCreateOrConnectWithoutFollowedUserInput[]
    createMany?: FollowCreateManyFollowedUserInputEnvelope
    connect?: FollowWhereUniqueInput | FollowWhereUniqueInput[]
  }

  export type FeedActivityCreateNestedManyWithoutUserInput = {
    create?: XOR<FeedActivityCreateWithoutUserInput, FeedActivityUncheckedCreateWithoutUserInput> | FeedActivityCreateWithoutUserInput[] | FeedActivityUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FeedActivityCreateOrConnectWithoutUserInput | FeedActivityCreateOrConnectWithoutUserInput[]
    createMany?: FeedActivityCreateManyUserInputEnvelope
    connect?: FeedActivityWhereUniqueInput | FeedActivityWhereUniqueInput[]
  }

  export type GuildInvitationCreateNestedManyWithoutInvitedByInput = {
    create?: XOR<GuildInvitationCreateWithoutInvitedByInput, GuildInvitationUncheckedCreateWithoutInvitedByInput> | GuildInvitationCreateWithoutInvitedByInput[] | GuildInvitationUncheckedCreateWithoutInvitedByInput[]
    connectOrCreate?: GuildInvitationCreateOrConnectWithoutInvitedByInput | GuildInvitationCreateOrConnectWithoutInvitedByInput[]
    createMany?: GuildInvitationCreateManyInvitedByInputEnvelope
    connect?: GuildInvitationWhereUniqueInput | GuildInvitationWhereUniqueInput[]
  }

  export type GuildInvitationCreateNestedManyWithoutInvitedUserInput = {
    create?: XOR<GuildInvitationCreateWithoutInvitedUserInput, GuildInvitationUncheckedCreateWithoutInvitedUserInput> | GuildInvitationCreateWithoutInvitedUserInput[] | GuildInvitationUncheckedCreateWithoutInvitedUserInput[]
    connectOrCreate?: GuildInvitationCreateOrConnectWithoutInvitedUserInput | GuildInvitationCreateOrConnectWithoutInvitedUserInput[]
    createMany?: GuildInvitationCreateManyInvitedUserInputEnvelope
    connect?: GuildInvitationWhereUniqueInput | GuildInvitationWhereUniqueInput[]
  }

  export type GuildUncheckedCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<GuildCreateWithoutCreatedByInput, GuildUncheckedCreateWithoutCreatedByInput> | GuildCreateWithoutCreatedByInput[] | GuildUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: GuildCreateOrConnectWithoutCreatedByInput | GuildCreateOrConnectWithoutCreatedByInput[]
    createMany?: GuildCreateManyCreatedByInputEnvelope
    connect?: GuildWhereUniqueInput | GuildWhereUniqueInput[]
  }

  export type GuildUncheckedCreateNestedManyWithoutCurrentOwnerInput = {
    create?: XOR<GuildCreateWithoutCurrentOwnerInput, GuildUncheckedCreateWithoutCurrentOwnerInput> | GuildCreateWithoutCurrentOwnerInput[] | GuildUncheckedCreateWithoutCurrentOwnerInput[]
    connectOrCreate?: GuildCreateOrConnectWithoutCurrentOwnerInput | GuildCreateOrConnectWithoutCurrentOwnerInput[]
    createMany?: GuildCreateManyCurrentOwnerInputEnvelope
    connect?: GuildWhereUniqueInput | GuildWhereUniqueInput[]
  }

  export type GuildUncheckedCreateNestedManyWithoutMembersInput = {
    create?: XOR<GuildCreateWithoutMembersInput, GuildUncheckedCreateWithoutMembersInput> | GuildCreateWithoutMembersInput[] | GuildUncheckedCreateWithoutMembersInput[]
    connectOrCreate?: GuildCreateOrConnectWithoutMembersInput | GuildCreateOrConnectWithoutMembersInput[]
    connect?: GuildWhereUniqueInput | GuildWhereUniqueInput[]
  }

  export type FollowUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<FollowCreateWithoutUserInput, FollowUncheckedCreateWithoutUserInput> | FollowCreateWithoutUserInput[] | FollowUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FollowCreateOrConnectWithoutUserInput | FollowCreateOrConnectWithoutUserInput[]
    createMany?: FollowCreateManyUserInputEnvelope
    connect?: FollowWhereUniqueInput | FollowWhereUniqueInput[]
  }

  export type FollowUncheckedCreateNestedManyWithoutFollowedUserInput = {
    create?: XOR<FollowCreateWithoutFollowedUserInput, FollowUncheckedCreateWithoutFollowedUserInput> | FollowCreateWithoutFollowedUserInput[] | FollowUncheckedCreateWithoutFollowedUserInput[]
    connectOrCreate?: FollowCreateOrConnectWithoutFollowedUserInput | FollowCreateOrConnectWithoutFollowedUserInput[]
    createMany?: FollowCreateManyFollowedUserInputEnvelope
    connect?: FollowWhereUniqueInput | FollowWhereUniqueInput[]
  }

  export type FeedActivityUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<FeedActivityCreateWithoutUserInput, FeedActivityUncheckedCreateWithoutUserInput> | FeedActivityCreateWithoutUserInput[] | FeedActivityUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FeedActivityCreateOrConnectWithoutUserInput | FeedActivityCreateOrConnectWithoutUserInput[]
    createMany?: FeedActivityCreateManyUserInputEnvelope
    connect?: FeedActivityWhereUniqueInput | FeedActivityWhereUniqueInput[]
  }

  export type GuildInvitationUncheckedCreateNestedManyWithoutInvitedByInput = {
    create?: XOR<GuildInvitationCreateWithoutInvitedByInput, GuildInvitationUncheckedCreateWithoutInvitedByInput> | GuildInvitationCreateWithoutInvitedByInput[] | GuildInvitationUncheckedCreateWithoutInvitedByInput[]
    connectOrCreate?: GuildInvitationCreateOrConnectWithoutInvitedByInput | GuildInvitationCreateOrConnectWithoutInvitedByInput[]
    createMany?: GuildInvitationCreateManyInvitedByInputEnvelope
    connect?: GuildInvitationWhereUniqueInput | GuildInvitationWhereUniqueInput[]
  }

  export type GuildInvitationUncheckedCreateNestedManyWithoutInvitedUserInput = {
    create?: XOR<GuildInvitationCreateWithoutInvitedUserInput, GuildInvitationUncheckedCreateWithoutInvitedUserInput> | GuildInvitationCreateWithoutInvitedUserInput[] | GuildInvitationUncheckedCreateWithoutInvitedUserInput[]
    connectOrCreate?: GuildInvitationCreateOrConnectWithoutInvitedUserInput | GuildInvitationCreateOrConnectWithoutInvitedUserInput[]
    createMany?: GuildInvitationCreateManyInvitedUserInputEnvelope
    connect?: GuildInvitationWhereUniqueInput | GuildInvitationWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type GuildUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<GuildCreateWithoutCreatedByInput, GuildUncheckedCreateWithoutCreatedByInput> | GuildCreateWithoutCreatedByInput[] | GuildUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: GuildCreateOrConnectWithoutCreatedByInput | GuildCreateOrConnectWithoutCreatedByInput[]
    upsert?: GuildUpsertWithWhereUniqueWithoutCreatedByInput | GuildUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: GuildCreateManyCreatedByInputEnvelope
    set?: GuildWhereUniqueInput | GuildWhereUniqueInput[]
    disconnect?: GuildWhereUniqueInput | GuildWhereUniqueInput[]
    delete?: GuildWhereUniqueInput | GuildWhereUniqueInput[]
    connect?: GuildWhereUniqueInput | GuildWhereUniqueInput[]
    update?: GuildUpdateWithWhereUniqueWithoutCreatedByInput | GuildUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: GuildUpdateManyWithWhereWithoutCreatedByInput | GuildUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: GuildScalarWhereInput | GuildScalarWhereInput[]
  }

  export type GuildUpdateManyWithoutCurrentOwnerNestedInput = {
    create?: XOR<GuildCreateWithoutCurrentOwnerInput, GuildUncheckedCreateWithoutCurrentOwnerInput> | GuildCreateWithoutCurrentOwnerInput[] | GuildUncheckedCreateWithoutCurrentOwnerInput[]
    connectOrCreate?: GuildCreateOrConnectWithoutCurrentOwnerInput | GuildCreateOrConnectWithoutCurrentOwnerInput[]
    upsert?: GuildUpsertWithWhereUniqueWithoutCurrentOwnerInput | GuildUpsertWithWhereUniqueWithoutCurrentOwnerInput[]
    createMany?: GuildCreateManyCurrentOwnerInputEnvelope
    set?: GuildWhereUniqueInput | GuildWhereUniqueInput[]
    disconnect?: GuildWhereUniqueInput | GuildWhereUniqueInput[]
    delete?: GuildWhereUniqueInput | GuildWhereUniqueInput[]
    connect?: GuildWhereUniqueInput | GuildWhereUniqueInput[]
    update?: GuildUpdateWithWhereUniqueWithoutCurrentOwnerInput | GuildUpdateWithWhereUniqueWithoutCurrentOwnerInput[]
    updateMany?: GuildUpdateManyWithWhereWithoutCurrentOwnerInput | GuildUpdateManyWithWhereWithoutCurrentOwnerInput[]
    deleteMany?: GuildScalarWhereInput | GuildScalarWhereInput[]
  }

  export type GuildUpdateManyWithoutMembersNestedInput = {
    create?: XOR<GuildCreateWithoutMembersInput, GuildUncheckedCreateWithoutMembersInput> | GuildCreateWithoutMembersInput[] | GuildUncheckedCreateWithoutMembersInput[]
    connectOrCreate?: GuildCreateOrConnectWithoutMembersInput | GuildCreateOrConnectWithoutMembersInput[]
    upsert?: GuildUpsertWithWhereUniqueWithoutMembersInput | GuildUpsertWithWhereUniqueWithoutMembersInput[]
    set?: GuildWhereUniqueInput | GuildWhereUniqueInput[]
    disconnect?: GuildWhereUniqueInput | GuildWhereUniqueInput[]
    delete?: GuildWhereUniqueInput | GuildWhereUniqueInput[]
    connect?: GuildWhereUniqueInput | GuildWhereUniqueInput[]
    update?: GuildUpdateWithWhereUniqueWithoutMembersInput | GuildUpdateWithWhereUniqueWithoutMembersInput[]
    updateMany?: GuildUpdateManyWithWhereWithoutMembersInput | GuildUpdateManyWithWhereWithoutMembersInput[]
    deleteMany?: GuildScalarWhereInput | GuildScalarWhereInput[]
  }

  export type FollowUpdateManyWithoutUserNestedInput = {
    create?: XOR<FollowCreateWithoutUserInput, FollowUncheckedCreateWithoutUserInput> | FollowCreateWithoutUserInput[] | FollowUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FollowCreateOrConnectWithoutUserInput | FollowCreateOrConnectWithoutUserInput[]
    upsert?: FollowUpsertWithWhereUniqueWithoutUserInput | FollowUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: FollowCreateManyUserInputEnvelope
    set?: FollowWhereUniqueInput | FollowWhereUniqueInput[]
    disconnect?: FollowWhereUniqueInput | FollowWhereUniqueInput[]
    delete?: FollowWhereUniqueInput | FollowWhereUniqueInput[]
    connect?: FollowWhereUniqueInput | FollowWhereUniqueInput[]
    update?: FollowUpdateWithWhereUniqueWithoutUserInput | FollowUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: FollowUpdateManyWithWhereWithoutUserInput | FollowUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: FollowScalarWhereInput | FollowScalarWhereInput[]
  }

  export type FollowUpdateManyWithoutFollowedUserNestedInput = {
    create?: XOR<FollowCreateWithoutFollowedUserInput, FollowUncheckedCreateWithoutFollowedUserInput> | FollowCreateWithoutFollowedUserInput[] | FollowUncheckedCreateWithoutFollowedUserInput[]
    connectOrCreate?: FollowCreateOrConnectWithoutFollowedUserInput | FollowCreateOrConnectWithoutFollowedUserInput[]
    upsert?: FollowUpsertWithWhereUniqueWithoutFollowedUserInput | FollowUpsertWithWhereUniqueWithoutFollowedUserInput[]
    createMany?: FollowCreateManyFollowedUserInputEnvelope
    set?: FollowWhereUniqueInput | FollowWhereUniqueInput[]
    disconnect?: FollowWhereUniqueInput | FollowWhereUniqueInput[]
    delete?: FollowWhereUniqueInput | FollowWhereUniqueInput[]
    connect?: FollowWhereUniqueInput | FollowWhereUniqueInput[]
    update?: FollowUpdateWithWhereUniqueWithoutFollowedUserInput | FollowUpdateWithWhereUniqueWithoutFollowedUserInput[]
    updateMany?: FollowUpdateManyWithWhereWithoutFollowedUserInput | FollowUpdateManyWithWhereWithoutFollowedUserInput[]
    deleteMany?: FollowScalarWhereInput | FollowScalarWhereInput[]
  }

  export type FeedActivityUpdateManyWithoutUserNestedInput = {
    create?: XOR<FeedActivityCreateWithoutUserInput, FeedActivityUncheckedCreateWithoutUserInput> | FeedActivityCreateWithoutUserInput[] | FeedActivityUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FeedActivityCreateOrConnectWithoutUserInput | FeedActivityCreateOrConnectWithoutUserInput[]
    upsert?: FeedActivityUpsertWithWhereUniqueWithoutUserInput | FeedActivityUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: FeedActivityCreateManyUserInputEnvelope
    set?: FeedActivityWhereUniqueInput | FeedActivityWhereUniqueInput[]
    disconnect?: FeedActivityWhereUniqueInput | FeedActivityWhereUniqueInput[]
    delete?: FeedActivityWhereUniqueInput | FeedActivityWhereUniqueInput[]
    connect?: FeedActivityWhereUniqueInput | FeedActivityWhereUniqueInput[]
    update?: FeedActivityUpdateWithWhereUniqueWithoutUserInput | FeedActivityUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: FeedActivityUpdateManyWithWhereWithoutUserInput | FeedActivityUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: FeedActivityScalarWhereInput | FeedActivityScalarWhereInput[]
  }

  export type GuildInvitationUpdateManyWithoutInvitedByNestedInput = {
    create?: XOR<GuildInvitationCreateWithoutInvitedByInput, GuildInvitationUncheckedCreateWithoutInvitedByInput> | GuildInvitationCreateWithoutInvitedByInput[] | GuildInvitationUncheckedCreateWithoutInvitedByInput[]
    connectOrCreate?: GuildInvitationCreateOrConnectWithoutInvitedByInput | GuildInvitationCreateOrConnectWithoutInvitedByInput[]
    upsert?: GuildInvitationUpsertWithWhereUniqueWithoutInvitedByInput | GuildInvitationUpsertWithWhereUniqueWithoutInvitedByInput[]
    createMany?: GuildInvitationCreateManyInvitedByInputEnvelope
    set?: GuildInvitationWhereUniqueInput | GuildInvitationWhereUniqueInput[]
    disconnect?: GuildInvitationWhereUniqueInput | GuildInvitationWhereUniqueInput[]
    delete?: GuildInvitationWhereUniqueInput | GuildInvitationWhereUniqueInput[]
    connect?: GuildInvitationWhereUniqueInput | GuildInvitationWhereUniqueInput[]
    update?: GuildInvitationUpdateWithWhereUniqueWithoutInvitedByInput | GuildInvitationUpdateWithWhereUniqueWithoutInvitedByInput[]
    updateMany?: GuildInvitationUpdateManyWithWhereWithoutInvitedByInput | GuildInvitationUpdateManyWithWhereWithoutInvitedByInput[]
    deleteMany?: GuildInvitationScalarWhereInput | GuildInvitationScalarWhereInput[]
  }

  export type GuildInvitationUpdateManyWithoutInvitedUserNestedInput = {
    create?: XOR<GuildInvitationCreateWithoutInvitedUserInput, GuildInvitationUncheckedCreateWithoutInvitedUserInput> | GuildInvitationCreateWithoutInvitedUserInput[] | GuildInvitationUncheckedCreateWithoutInvitedUserInput[]
    connectOrCreate?: GuildInvitationCreateOrConnectWithoutInvitedUserInput | GuildInvitationCreateOrConnectWithoutInvitedUserInput[]
    upsert?: GuildInvitationUpsertWithWhereUniqueWithoutInvitedUserInput | GuildInvitationUpsertWithWhereUniqueWithoutInvitedUserInput[]
    createMany?: GuildInvitationCreateManyInvitedUserInputEnvelope
    set?: GuildInvitationWhereUniqueInput | GuildInvitationWhereUniqueInput[]
    disconnect?: GuildInvitationWhereUniqueInput | GuildInvitationWhereUniqueInput[]
    delete?: GuildInvitationWhereUniqueInput | GuildInvitationWhereUniqueInput[]
    connect?: GuildInvitationWhereUniqueInput | GuildInvitationWhereUniqueInput[]
    update?: GuildInvitationUpdateWithWhereUniqueWithoutInvitedUserInput | GuildInvitationUpdateWithWhereUniqueWithoutInvitedUserInput[]
    updateMany?: GuildInvitationUpdateManyWithWhereWithoutInvitedUserInput | GuildInvitationUpdateManyWithWhereWithoutInvitedUserInput[]
    deleteMany?: GuildInvitationScalarWhereInput | GuildInvitationScalarWhereInput[]
  }

  export type GuildUncheckedUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<GuildCreateWithoutCreatedByInput, GuildUncheckedCreateWithoutCreatedByInput> | GuildCreateWithoutCreatedByInput[] | GuildUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: GuildCreateOrConnectWithoutCreatedByInput | GuildCreateOrConnectWithoutCreatedByInput[]
    upsert?: GuildUpsertWithWhereUniqueWithoutCreatedByInput | GuildUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: GuildCreateManyCreatedByInputEnvelope
    set?: GuildWhereUniqueInput | GuildWhereUniqueInput[]
    disconnect?: GuildWhereUniqueInput | GuildWhereUniqueInput[]
    delete?: GuildWhereUniqueInput | GuildWhereUniqueInput[]
    connect?: GuildWhereUniqueInput | GuildWhereUniqueInput[]
    update?: GuildUpdateWithWhereUniqueWithoutCreatedByInput | GuildUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: GuildUpdateManyWithWhereWithoutCreatedByInput | GuildUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: GuildScalarWhereInput | GuildScalarWhereInput[]
  }

  export type GuildUncheckedUpdateManyWithoutCurrentOwnerNestedInput = {
    create?: XOR<GuildCreateWithoutCurrentOwnerInput, GuildUncheckedCreateWithoutCurrentOwnerInput> | GuildCreateWithoutCurrentOwnerInput[] | GuildUncheckedCreateWithoutCurrentOwnerInput[]
    connectOrCreate?: GuildCreateOrConnectWithoutCurrentOwnerInput | GuildCreateOrConnectWithoutCurrentOwnerInput[]
    upsert?: GuildUpsertWithWhereUniqueWithoutCurrentOwnerInput | GuildUpsertWithWhereUniqueWithoutCurrentOwnerInput[]
    createMany?: GuildCreateManyCurrentOwnerInputEnvelope
    set?: GuildWhereUniqueInput | GuildWhereUniqueInput[]
    disconnect?: GuildWhereUniqueInput | GuildWhereUniqueInput[]
    delete?: GuildWhereUniqueInput | GuildWhereUniqueInput[]
    connect?: GuildWhereUniqueInput | GuildWhereUniqueInput[]
    update?: GuildUpdateWithWhereUniqueWithoutCurrentOwnerInput | GuildUpdateWithWhereUniqueWithoutCurrentOwnerInput[]
    updateMany?: GuildUpdateManyWithWhereWithoutCurrentOwnerInput | GuildUpdateManyWithWhereWithoutCurrentOwnerInput[]
    deleteMany?: GuildScalarWhereInput | GuildScalarWhereInput[]
  }

  export type GuildUncheckedUpdateManyWithoutMembersNestedInput = {
    create?: XOR<GuildCreateWithoutMembersInput, GuildUncheckedCreateWithoutMembersInput> | GuildCreateWithoutMembersInput[] | GuildUncheckedCreateWithoutMembersInput[]
    connectOrCreate?: GuildCreateOrConnectWithoutMembersInput | GuildCreateOrConnectWithoutMembersInput[]
    upsert?: GuildUpsertWithWhereUniqueWithoutMembersInput | GuildUpsertWithWhereUniqueWithoutMembersInput[]
    set?: GuildWhereUniqueInput | GuildWhereUniqueInput[]
    disconnect?: GuildWhereUniqueInput | GuildWhereUniqueInput[]
    delete?: GuildWhereUniqueInput | GuildWhereUniqueInput[]
    connect?: GuildWhereUniqueInput | GuildWhereUniqueInput[]
    update?: GuildUpdateWithWhereUniqueWithoutMembersInput | GuildUpdateWithWhereUniqueWithoutMembersInput[]
    updateMany?: GuildUpdateManyWithWhereWithoutMembersInput | GuildUpdateManyWithWhereWithoutMembersInput[]
    deleteMany?: GuildScalarWhereInput | GuildScalarWhereInput[]
  }

  export type FollowUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<FollowCreateWithoutUserInput, FollowUncheckedCreateWithoutUserInput> | FollowCreateWithoutUserInput[] | FollowUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FollowCreateOrConnectWithoutUserInput | FollowCreateOrConnectWithoutUserInput[]
    upsert?: FollowUpsertWithWhereUniqueWithoutUserInput | FollowUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: FollowCreateManyUserInputEnvelope
    set?: FollowWhereUniqueInput | FollowWhereUniqueInput[]
    disconnect?: FollowWhereUniqueInput | FollowWhereUniqueInput[]
    delete?: FollowWhereUniqueInput | FollowWhereUniqueInput[]
    connect?: FollowWhereUniqueInput | FollowWhereUniqueInput[]
    update?: FollowUpdateWithWhereUniqueWithoutUserInput | FollowUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: FollowUpdateManyWithWhereWithoutUserInput | FollowUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: FollowScalarWhereInput | FollowScalarWhereInput[]
  }

  export type FollowUncheckedUpdateManyWithoutFollowedUserNestedInput = {
    create?: XOR<FollowCreateWithoutFollowedUserInput, FollowUncheckedCreateWithoutFollowedUserInput> | FollowCreateWithoutFollowedUserInput[] | FollowUncheckedCreateWithoutFollowedUserInput[]
    connectOrCreate?: FollowCreateOrConnectWithoutFollowedUserInput | FollowCreateOrConnectWithoutFollowedUserInput[]
    upsert?: FollowUpsertWithWhereUniqueWithoutFollowedUserInput | FollowUpsertWithWhereUniqueWithoutFollowedUserInput[]
    createMany?: FollowCreateManyFollowedUserInputEnvelope
    set?: FollowWhereUniqueInput | FollowWhereUniqueInput[]
    disconnect?: FollowWhereUniqueInput | FollowWhereUniqueInput[]
    delete?: FollowWhereUniqueInput | FollowWhereUniqueInput[]
    connect?: FollowWhereUniqueInput | FollowWhereUniqueInput[]
    update?: FollowUpdateWithWhereUniqueWithoutFollowedUserInput | FollowUpdateWithWhereUniqueWithoutFollowedUserInput[]
    updateMany?: FollowUpdateManyWithWhereWithoutFollowedUserInput | FollowUpdateManyWithWhereWithoutFollowedUserInput[]
    deleteMany?: FollowScalarWhereInput | FollowScalarWhereInput[]
  }

  export type FeedActivityUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<FeedActivityCreateWithoutUserInput, FeedActivityUncheckedCreateWithoutUserInput> | FeedActivityCreateWithoutUserInput[] | FeedActivityUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FeedActivityCreateOrConnectWithoutUserInput | FeedActivityCreateOrConnectWithoutUserInput[]
    upsert?: FeedActivityUpsertWithWhereUniqueWithoutUserInput | FeedActivityUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: FeedActivityCreateManyUserInputEnvelope
    set?: FeedActivityWhereUniqueInput | FeedActivityWhereUniqueInput[]
    disconnect?: FeedActivityWhereUniqueInput | FeedActivityWhereUniqueInput[]
    delete?: FeedActivityWhereUniqueInput | FeedActivityWhereUniqueInput[]
    connect?: FeedActivityWhereUniqueInput | FeedActivityWhereUniqueInput[]
    update?: FeedActivityUpdateWithWhereUniqueWithoutUserInput | FeedActivityUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: FeedActivityUpdateManyWithWhereWithoutUserInput | FeedActivityUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: FeedActivityScalarWhereInput | FeedActivityScalarWhereInput[]
  }

  export type GuildInvitationUncheckedUpdateManyWithoutInvitedByNestedInput = {
    create?: XOR<GuildInvitationCreateWithoutInvitedByInput, GuildInvitationUncheckedCreateWithoutInvitedByInput> | GuildInvitationCreateWithoutInvitedByInput[] | GuildInvitationUncheckedCreateWithoutInvitedByInput[]
    connectOrCreate?: GuildInvitationCreateOrConnectWithoutInvitedByInput | GuildInvitationCreateOrConnectWithoutInvitedByInput[]
    upsert?: GuildInvitationUpsertWithWhereUniqueWithoutInvitedByInput | GuildInvitationUpsertWithWhereUniqueWithoutInvitedByInput[]
    createMany?: GuildInvitationCreateManyInvitedByInputEnvelope
    set?: GuildInvitationWhereUniqueInput | GuildInvitationWhereUniqueInput[]
    disconnect?: GuildInvitationWhereUniqueInput | GuildInvitationWhereUniqueInput[]
    delete?: GuildInvitationWhereUniqueInput | GuildInvitationWhereUniqueInput[]
    connect?: GuildInvitationWhereUniqueInput | GuildInvitationWhereUniqueInput[]
    update?: GuildInvitationUpdateWithWhereUniqueWithoutInvitedByInput | GuildInvitationUpdateWithWhereUniqueWithoutInvitedByInput[]
    updateMany?: GuildInvitationUpdateManyWithWhereWithoutInvitedByInput | GuildInvitationUpdateManyWithWhereWithoutInvitedByInput[]
    deleteMany?: GuildInvitationScalarWhereInput | GuildInvitationScalarWhereInput[]
  }

  export type GuildInvitationUncheckedUpdateManyWithoutInvitedUserNestedInput = {
    create?: XOR<GuildInvitationCreateWithoutInvitedUserInput, GuildInvitationUncheckedCreateWithoutInvitedUserInput> | GuildInvitationCreateWithoutInvitedUserInput[] | GuildInvitationUncheckedCreateWithoutInvitedUserInput[]
    connectOrCreate?: GuildInvitationCreateOrConnectWithoutInvitedUserInput | GuildInvitationCreateOrConnectWithoutInvitedUserInput[]
    upsert?: GuildInvitationUpsertWithWhereUniqueWithoutInvitedUserInput | GuildInvitationUpsertWithWhereUniqueWithoutInvitedUserInput[]
    createMany?: GuildInvitationCreateManyInvitedUserInputEnvelope
    set?: GuildInvitationWhereUniqueInput | GuildInvitationWhereUniqueInput[]
    disconnect?: GuildInvitationWhereUniqueInput | GuildInvitationWhereUniqueInput[]
    delete?: GuildInvitationWhereUniqueInput | GuildInvitationWhereUniqueInput[]
    connect?: GuildInvitationWhereUniqueInput | GuildInvitationWhereUniqueInput[]
    update?: GuildInvitationUpdateWithWhereUniqueWithoutInvitedUserInput | GuildInvitationUpdateWithWhereUniqueWithoutInvitedUserInput[]
    updateMany?: GuildInvitationUpdateManyWithWhereWithoutInvitedUserInput | GuildInvitationUpdateManyWithWhereWithoutInvitedUserInput[]
    deleteMany?: GuildInvitationScalarWhereInput | GuildInvitationScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutFollowsInput = {
    create?: XOR<UserCreateWithoutFollowsInput, UserUncheckedCreateWithoutFollowsInput>
    connectOrCreate?: UserCreateOrConnectWithoutFollowsInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutFollowedByInput = {
    create?: XOR<UserCreateWithoutFollowedByInput, UserUncheckedCreateWithoutFollowedByInput>
    connectOrCreate?: UserCreateOrConnectWithoutFollowedByInput
    connect?: UserWhereUniqueInput
  }

  export type TagCreateNestedOneWithoutFollowsInput = {
    create?: XOR<TagCreateWithoutFollowsInput, TagUncheckedCreateWithoutFollowsInput>
    connectOrCreate?: TagCreateOrConnectWithoutFollowsInput
    connect?: TagWhereUniqueInput
  }

  export type GuildCreateNestedOneWithoutFollowsInput = {
    create?: XOR<GuildCreateWithoutFollowsInput, GuildUncheckedCreateWithoutFollowsInput>
    connectOrCreate?: GuildCreateOrConnectWithoutFollowsInput
    connect?: GuildWhereUniqueInput
  }

  export type EnumFollowEntityTypeFieldUpdateOperationsInput = {
    set?: $Enums.FollowEntityType
  }

  export type UserUpdateOneRequiredWithoutFollowsNestedInput = {
    create?: XOR<UserCreateWithoutFollowsInput, UserUncheckedCreateWithoutFollowsInput>
    connectOrCreate?: UserCreateOrConnectWithoutFollowsInput
    upsert?: UserUpsertWithoutFollowsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutFollowsInput, UserUpdateWithoutFollowsInput>, UserUncheckedUpdateWithoutFollowsInput>
  }

  export type UserUpdateOneWithoutFollowedByNestedInput = {
    create?: XOR<UserCreateWithoutFollowedByInput, UserUncheckedCreateWithoutFollowedByInput>
    connectOrCreate?: UserCreateOrConnectWithoutFollowedByInput
    upsert?: UserUpsertWithoutFollowedByInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutFollowedByInput, UserUpdateWithoutFollowedByInput>, UserUncheckedUpdateWithoutFollowedByInput>
  }

  export type TagUpdateOneWithoutFollowsNestedInput = {
    create?: XOR<TagCreateWithoutFollowsInput, TagUncheckedCreateWithoutFollowsInput>
    connectOrCreate?: TagCreateOrConnectWithoutFollowsInput
    upsert?: TagUpsertWithoutFollowsInput
    disconnect?: TagWhereInput | boolean
    delete?: TagWhereInput | boolean
    connect?: TagWhereUniqueInput
    update?: XOR<XOR<TagUpdateToOneWithWhereWithoutFollowsInput, TagUpdateWithoutFollowsInput>, TagUncheckedUpdateWithoutFollowsInput>
  }

  export type GuildUpdateOneWithoutFollowsNestedInput = {
    create?: XOR<GuildCreateWithoutFollowsInput, GuildUncheckedCreateWithoutFollowsInput>
    connectOrCreate?: GuildCreateOrConnectWithoutFollowsInput
    upsert?: GuildUpsertWithoutFollowsInput
    disconnect?: GuildWhereInput | boolean
    delete?: GuildWhereInput | boolean
    connect?: GuildWhereUniqueInput
    update?: XOR<XOR<GuildUpdateToOneWithWhereWithoutFollowsInput, GuildUpdateWithoutFollowsInput>, GuildUncheckedUpdateWithoutFollowsInput>
  }

  export type FollowCreateNestedManyWithoutTagInput = {
    create?: XOR<FollowCreateWithoutTagInput, FollowUncheckedCreateWithoutTagInput> | FollowCreateWithoutTagInput[] | FollowUncheckedCreateWithoutTagInput[]
    connectOrCreate?: FollowCreateOrConnectWithoutTagInput | FollowCreateOrConnectWithoutTagInput[]
    createMany?: FollowCreateManyTagInputEnvelope
    connect?: FollowWhereUniqueInput | FollowWhereUniqueInput[]
  }

  export type FollowUncheckedCreateNestedManyWithoutTagInput = {
    create?: XOR<FollowCreateWithoutTagInput, FollowUncheckedCreateWithoutTagInput> | FollowCreateWithoutTagInput[] | FollowUncheckedCreateWithoutTagInput[]
    connectOrCreate?: FollowCreateOrConnectWithoutTagInput | FollowCreateOrConnectWithoutTagInput[]
    createMany?: FollowCreateManyTagInputEnvelope
    connect?: FollowWhereUniqueInput | FollowWhereUniqueInput[]
  }

  export type FollowUpdateManyWithoutTagNestedInput = {
    create?: XOR<FollowCreateWithoutTagInput, FollowUncheckedCreateWithoutTagInput> | FollowCreateWithoutTagInput[] | FollowUncheckedCreateWithoutTagInput[]
    connectOrCreate?: FollowCreateOrConnectWithoutTagInput | FollowCreateOrConnectWithoutTagInput[]
    upsert?: FollowUpsertWithWhereUniqueWithoutTagInput | FollowUpsertWithWhereUniqueWithoutTagInput[]
    createMany?: FollowCreateManyTagInputEnvelope
    set?: FollowWhereUniqueInput | FollowWhereUniqueInput[]
    disconnect?: FollowWhereUniqueInput | FollowWhereUniqueInput[]
    delete?: FollowWhereUniqueInput | FollowWhereUniqueInput[]
    connect?: FollowWhereUniqueInput | FollowWhereUniqueInput[]
    update?: FollowUpdateWithWhereUniqueWithoutTagInput | FollowUpdateWithWhereUniqueWithoutTagInput[]
    updateMany?: FollowUpdateManyWithWhereWithoutTagInput | FollowUpdateManyWithWhereWithoutTagInput[]
    deleteMany?: FollowScalarWhereInput | FollowScalarWhereInput[]
  }

  export type FollowUncheckedUpdateManyWithoutTagNestedInput = {
    create?: XOR<FollowCreateWithoutTagInput, FollowUncheckedCreateWithoutTagInput> | FollowCreateWithoutTagInput[] | FollowUncheckedCreateWithoutTagInput[]
    connectOrCreate?: FollowCreateOrConnectWithoutTagInput | FollowCreateOrConnectWithoutTagInput[]
    upsert?: FollowUpsertWithWhereUniqueWithoutTagInput | FollowUpsertWithWhereUniqueWithoutTagInput[]
    createMany?: FollowCreateManyTagInputEnvelope
    set?: FollowWhereUniqueInput | FollowWhereUniqueInput[]
    disconnect?: FollowWhereUniqueInput | FollowWhereUniqueInput[]
    delete?: FollowWhereUniqueInput | FollowWhereUniqueInput[]
    connect?: FollowWhereUniqueInput | FollowWhereUniqueInput[]
    update?: FollowUpdateWithWhereUniqueWithoutTagInput | FollowUpdateWithWhereUniqueWithoutTagInput[]
    updateMany?: FollowUpdateManyWithWhereWithoutTagInput | FollowUpdateManyWithWhereWithoutTagInput[]
    deleteMany?: FollowScalarWhereInput | FollowScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutCreatedGuildsInput = {
    create?: XOR<UserCreateWithoutCreatedGuildsInput, UserUncheckedCreateWithoutCreatedGuildsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCreatedGuildsInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutOwnedGuildsInput = {
    create?: XOR<UserCreateWithoutOwnedGuildsInput, UserUncheckedCreateWithoutOwnedGuildsInput>
    connectOrCreate?: UserCreateOrConnectWithoutOwnedGuildsInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedManyWithoutMemberOfGuildsInput = {
    create?: XOR<UserCreateWithoutMemberOfGuildsInput, UserUncheckedCreateWithoutMemberOfGuildsInput> | UserCreateWithoutMemberOfGuildsInput[] | UserUncheckedCreateWithoutMemberOfGuildsInput[]
    connectOrCreate?: UserCreateOrConnectWithoutMemberOfGuildsInput | UserCreateOrConnectWithoutMemberOfGuildsInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type ActCreateNestedOneWithoutGuildInput = {
    create?: XOR<ActCreateWithoutGuildInput, ActUncheckedCreateWithoutGuildInput>
    connectOrCreate?: ActCreateOrConnectWithoutGuildInput
    connect?: ActWhereUniqueInput
  }

  export type VenueCreateNestedOneWithoutGuildInput = {
    create?: XOR<VenueCreateWithoutGuildInput, VenueUncheckedCreateWithoutGuildInput>
    connectOrCreate?: VenueCreateOrConnectWithoutGuildInput
    connect?: VenueWhereUniqueInput
  }

  export type ClubCreateNestedOneWithoutGuildInput = {
    create?: XOR<ClubCreateWithoutGuildInput, ClubUncheckedCreateWithoutGuildInput>
    connectOrCreate?: ClubCreateOrConnectWithoutGuildInput
    connect?: ClubWhereUniqueInput
  }

  export type FollowCreateNestedManyWithoutGuildInput = {
    create?: XOR<FollowCreateWithoutGuildInput, FollowUncheckedCreateWithoutGuildInput> | FollowCreateWithoutGuildInput[] | FollowUncheckedCreateWithoutGuildInput[]
    connectOrCreate?: FollowCreateOrConnectWithoutGuildInput | FollowCreateOrConnectWithoutGuildInput[]
    createMany?: FollowCreateManyGuildInputEnvelope
    connect?: FollowWhereUniqueInput | FollowWhereUniqueInput[]
  }

  export type GuildInvitationCreateNestedManyWithoutGuildInput = {
    create?: XOR<GuildInvitationCreateWithoutGuildInput, GuildInvitationUncheckedCreateWithoutGuildInput> | GuildInvitationCreateWithoutGuildInput[] | GuildInvitationUncheckedCreateWithoutGuildInput[]
    connectOrCreate?: GuildInvitationCreateOrConnectWithoutGuildInput | GuildInvitationCreateOrConnectWithoutGuildInput[]
    createMany?: GuildInvitationCreateManyGuildInputEnvelope
    connect?: GuildInvitationWhereUniqueInput | GuildInvitationWhereUniqueInput[]
  }

  export type UserUncheckedCreateNestedManyWithoutMemberOfGuildsInput = {
    create?: XOR<UserCreateWithoutMemberOfGuildsInput, UserUncheckedCreateWithoutMemberOfGuildsInput> | UserCreateWithoutMemberOfGuildsInput[] | UserUncheckedCreateWithoutMemberOfGuildsInput[]
    connectOrCreate?: UserCreateOrConnectWithoutMemberOfGuildsInput | UserCreateOrConnectWithoutMemberOfGuildsInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type FollowUncheckedCreateNestedManyWithoutGuildInput = {
    create?: XOR<FollowCreateWithoutGuildInput, FollowUncheckedCreateWithoutGuildInput> | FollowCreateWithoutGuildInput[] | FollowUncheckedCreateWithoutGuildInput[]
    connectOrCreate?: FollowCreateOrConnectWithoutGuildInput | FollowCreateOrConnectWithoutGuildInput[]
    createMany?: FollowCreateManyGuildInputEnvelope
    connect?: FollowWhereUniqueInput | FollowWhereUniqueInput[]
  }

  export type GuildInvitationUncheckedCreateNestedManyWithoutGuildInput = {
    create?: XOR<GuildInvitationCreateWithoutGuildInput, GuildInvitationUncheckedCreateWithoutGuildInput> | GuildInvitationCreateWithoutGuildInput[] | GuildInvitationUncheckedCreateWithoutGuildInput[]
    connectOrCreate?: GuildInvitationCreateOrConnectWithoutGuildInput | GuildInvitationCreateOrConnectWithoutGuildInput[]
    createMany?: GuildInvitationCreateManyGuildInputEnvelope
    connect?: GuildInvitationWhereUniqueInput | GuildInvitationWhereUniqueInput[]
  }

  export type EnumGuildTypeFieldUpdateOperationsInput = {
    set?: $Enums.GuildType
  }

  export type UserUpdateOneWithoutCreatedGuildsNestedInput = {
    create?: XOR<UserCreateWithoutCreatedGuildsInput, UserUncheckedCreateWithoutCreatedGuildsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCreatedGuildsInput
    upsert?: UserUpsertWithoutCreatedGuildsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCreatedGuildsInput, UserUpdateWithoutCreatedGuildsInput>, UserUncheckedUpdateWithoutCreatedGuildsInput>
  }

  export type UserUpdateOneRequiredWithoutOwnedGuildsNestedInput = {
    create?: XOR<UserCreateWithoutOwnedGuildsInput, UserUncheckedCreateWithoutOwnedGuildsInput>
    connectOrCreate?: UserCreateOrConnectWithoutOwnedGuildsInput
    upsert?: UserUpsertWithoutOwnedGuildsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutOwnedGuildsInput, UserUpdateWithoutOwnedGuildsInput>, UserUncheckedUpdateWithoutOwnedGuildsInput>
  }

  export type UserUpdateManyWithoutMemberOfGuildsNestedInput = {
    create?: XOR<UserCreateWithoutMemberOfGuildsInput, UserUncheckedCreateWithoutMemberOfGuildsInput> | UserCreateWithoutMemberOfGuildsInput[] | UserUncheckedCreateWithoutMemberOfGuildsInput[]
    connectOrCreate?: UserCreateOrConnectWithoutMemberOfGuildsInput | UserCreateOrConnectWithoutMemberOfGuildsInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutMemberOfGuildsInput | UserUpsertWithWhereUniqueWithoutMemberOfGuildsInput[]
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutMemberOfGuildsInput | UserUpdateWithWhereUniqueWithoutMemberOfGuildsInput[]
    updateMany?: UserUpdateManyWithWhereWithoutMemberOfGuildsInput | UserUpdateManyWithWhereWithoutMemberOfGuildsInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type ActUpdateOneWithoutGuildNestedInput = {
    create?: XOR<ActCreateWithoutGuildInput, ActUncheckedCreateWithoutGuildInput>
    connectOrCreate?: ActCreateOrConnectWithoutGuildInput
    upsert?: ActUpsertWithoutGuildInput
    disconnect?: ActWhereInput | boolean
    delete?: ActWhereInput | boolean
    connect?: ActWhereUniqueInput
    update?: XOR<XOR<ActUpdateToOneWithWhereWithoutGuildInput, ActUpdateWithoutGuildInput>, ActUncheckedUpdateWithoutGuildInput>
  }

  export type VenueUpdateOneWithoutGuildNestedInput = {
    create?: XOR<VenueCreateWithoutGuildInput, VenueUncheckedCreateWithoutGuildInput>
    connectOrCreate?: VenueCreateOrConnectWithoutGuildInput
    upsert?: VenueUpsertWithoutGuildInput
    disconnect?: VenueWhereInput | boolean
    delete?: VenueWhereInput | boolean
    connect?: VenueWhereUniqueInput
    update?: XOR<XOR<VenueUpdateToOneWithWhereWithoutGuildInput, VenueUpdateWithoutGuildInput>, VenueUncheckedUpdateWithoutGuildInput>
  }

  export type ClubUpdateOneWithoutGuildNestedInput = {
    create?: XOR<ClubCreateWithoutGuildInput, ClubUncheckedCreateWithoutGuildInput>
    connectOrCreate?: ClubCreateOrConnectWithoutGuildInput
    upsert?: ClubUpsertWithoutGuildInput
    disconnect?: ClubWhereInput | boolean
    delete?: ClubWhereInput | boolean
    connect?: ClubWhereUniqueInput
    update?: XOR<XOR<ClubUpdateToOneWithWhereWithoutGuildInput, ClubUpdateWithoutGuildInput>, ClubUncheckedUpdateWithoutGuildInput>
  }

  export type FollowUpdateManyWithoutGuildNestedInput = {
    create?: XOR<FollowCreateWithoutGuildInput, FollowUncheckedCreateWithoutGuildInput> | FollowCreateWithoutGuildInput[] | FollowUncheckedCreateWithoutGuildInput[]
    connectOrCreate?: FollowCreateOrConnectWithoutGuildInput | FollowCreateOrConnectWithoutGuildInput[]
    upsert?: FollowUpsertWithWhereUniqueWithoutGuildInput | FollowUpsertWithWhereUniqueWithoutGuildInput[]
    createMany?: FollowCreateManyGuildInputEnvelope
    set?: FollowWhereUniqueInput | FollowWhereUniqueInput[]
    disconnect?: FollowWhereUniqueInput | FollowWhereUniqueInput[]
    delete?: FollowWhereUniqueInput | FollowWhereUniqueInput[]
    connect?: FollowWhereUniqueInput | FollowWhereUniqueInput[]
    update?: FollowUpdateWithWhereUniqueWithoutGuildInput | FollowUpdateWithWhereUniqueWithoutGuildInput[]
    updateMany?: FollowUpdateManyWithWhereWithoutGuildInput | FollowUpdateManyWithWhereWithoutGuildInput[]
    deleteMany?: FollowScalarWhereInput | FollowScalarWhereInput[]
  }

  export type GuildInvitationUpdateManyWithoutGuildNestedInput = {
    create?: XOR<GuildInvitationCreateWithoutGuildInput, GuildInvitationUncheckedCreateWithoutGuildInput> | GuildInvitationCreateWithoutGuildInput[] | GuildInvitationUncheckedCreateWithoutGuildInput[]
    connectOrCreate?: GuildInvitationCreateOrConnectWithoutGuildInput | GuildInvitationCreateOrConnectWithoutGuildInput[]
    upsert?: GuildInvitationUpsertWithWhereUniqueWithoutGuildInput | GuildInvitationUpsertWithWhereUniqueWithoutGuildInput[]
    createMany?: GuildInvitationCreateManyGuildInputEnvelope
    set?: GuildInvitationWhereUniqueInput | GuildInvitationWhereUniqueInput[]
    disconnect?: GuildInvitationWhereUniqueInput | GuildInvitationWhereUniqueInput[]
    delete?: GuildInvitationWhereUniqueInput | GuildInvitationWhereUniqueInput[]
    connect?: GuildInvitationWhereUniqueInput | GuildInvitationWhereUniqueInput[]
    update?: GuildInvitationUpdateWithWhereUniqueWithoutGuildInput | GuildInvitationUpdateWithWhereUniqueWithoutGuildInput[]
    updateMany?: GuildInvitationUpdateManyWithWhereWithoutGuildInput | GuildInvitationUpdateManyWithWhereWithoutGuildInput[]
    deleteMany?: GuildInvitationScalarWhereInput | GuildInvitationScalarWhereInput[]
  }

  export type UserUncheckedUpdateManyWithoutMemberOfGuildsNestedInput = {
    create?: XOR<UserCreateWithoutMemberOfGuildsInput, UserUncheckedCreateWithoutMemberOfGuildsInput> | UserCreateWithoutMemberOfGuildsInput[] | UserUncheckedCreateWithoutMemberOfGuildsInput[]
    connectOrCreate?: UserCreateOrConnectWithoutMemberOfGuildsInput | UserCreateOrConnectWithoutMemberOfGuildsInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutMemberOfGuildsInput | UserUpsertWithWhereUniqueWithoutMemberOfGuildsInput[]
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutMemberOfGuildsInput | UserUpdateWithWhereUniqueWithoutMemberOfGuildsInput[]
    updateMany?: UserUpdateManyWithWhereWithoutMemberOfGuildsInput | UserUpdateManyWithWhereWithoutMemberOfGuildsInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type FollowUncheckedUpdateManyWithoutGuildNestedInput = {
    create?: XOR<FollowCreateWithoutGuildInput, FollowUncheckedCreateWithoutGuildInput> | FollowCreateWithoutGuildInput[] | FollowUncheckedCreateWithoutGuildInput[]
    connectOrCreate?: FollowCreateOrConnectWithoutGuildInput | FollowCreateOrConnectWithoutGuildInput[]
    upsert?: FollowUpsertWithWhereUniqueWithoutGuildInput | FollowUpsertWithWhereUniqueWithoutGuildInput[]
    createMany?: FollowCreateManyGuildInputEnvelope
    set?: FollowWhereUniqueInput | FollowWhereUniqueInput[]
    disconnect?: FollowWhereUniqueInput | FollowWhereUniqueInput[]
    delete?: FollowWhereUniqueInput | FollowWhereUniqueInput[]
    connect?: FollowWhereUniqueInput | FollowWhereUniqueInput[]
    update?: FollowUpdateWithWhereUniqueWithoutGuildInput | FollowUpdateWithWhereUniqueWithoutGuildInput[]
    updateMany?: FollowUpdateManyWithWhereWithoutGuildInput | FollowUpdateManyWithWhereWithoutGuildInput[]
    deleteMany?: FollowScalarWhereInput | FollowScalarWhereInput[]
  }

  export type GuildInvitationUncheckedUpdateManyWithoutGuildNestedInput = {
    create?: XOR<GuildInvitationCreateWithoutGuildInput, GuildInvitationUncheckedCreateWithoutGuildInput> | GuildInvitationCreateWithoutGuildInput[] | GuildInvitationUncheckedCreateWithoutGuildInput[]
    connectOrCreate?: GuildInvitationCreateOrConnectWithoutGuildInput | GuildInvitationCreateOrConnectWithoutGuildInput[]
    upsert?: GuildInvitationUpsertWithWhereUniqueWithoutGuildInput | GuildInvitationUpsertWithWhereUniqueWithoutGuildInput[]
    createMany?: GuildInvitationCreateManyGuildInputEnvelope
    set?: GuildInvitationWhereUniqueInput | GuildInvitationWhereUniqueInput[]
    disconnect?: GuildInvitationWhereUniqueInput | GuildInvitationWhereUniqueInput[]
    delete?: GuildInvitationWhereUniqueInput | GuildInvitationWhereUniqueInput[]
    connect?: GuildInvitationWhereUniqueInput | GuildInvitationWhereUniqueInput[]
    update?: GuildInvitationUpdateWithWhereUniqueWithoutGuildInput | GuildInvitationUpdateWithWhereUniqueWithoutGuildInput[]
    updateMany?: GuildInvitationUpdateManyWithWhereWithoutGuildInput | GuildInvitationUpdateManyWithWhereWithoutGuildInput[]
    deleteMany?: GuildInvitationScalarWhereInput | GuildInvitationScalarWhereInput[]
  }

  export type GuildCreateNestedOneWithoutActInput = {
    create?: XOR<GuildCreateWithoutActInput, GuildUncheckedCreateWithoutActInput>
    connectOrCreate?: GuildCreateOrConnectWithoutActInput
    connect?: GuildWhereUniqueInput
  }

  export type CalendarEventCreateNestedManyWithoutActsInput = {
    create?: XOR<CalendarEventCreateWithoutActsInput, CalendarEventUncheckedCreateWithoutActsInput> | CalendarEventCreateWithoutActsInput[] | CalendarEventUncheckedCreateWithoutActsInput[]
    connectOrCreate?: CalendarEventCreateOrConnectWithoutActsInput | CalendarEventCreateOrConnectWithoutActsInput[]
    connect?: CalendarEventWhereUniqueInput | CalendarEventWhereUniqueInput[]
  }

  export type GuildUncheckedCreateNestedOneWithoutActInput = {
    create?: XOR<GuildCreateWithoutActInput, GuildUncheckedCreateWithoutActInput>
    connectOrCreate?: GuildCreateOrConnectWithoutActInput
    connect?: GuildWhereUniqueInput
  }

  export type CalendarEventUncheckedCreateNestedManyWithoutActsInput = {
    create?: XOR<CalendarEventCreateWithoutActsInput, CalendarEventUncheckedCreateWithoutActsInput> | CalendarEventCreateWithoutActsInput[] | CalendarEventUncheckedCreateWithoutActsInput[]
    connectOrCreate?: CalendarEventCreateOrConnectWithoutActsInput | CalendarEventCreateOrConnectWithoutActsInput[]
    connect?: CalendarEventWhereUniqueInput | CalendarEventWhereUniqueInput[]
  }

  export type GuildUpdateOneWithoutActNestedInput = {
    create?: XOR<GuildCreateWithoutActInput, GuildUncheckedCreateWithoutActInput>
    connectOrCreate?: GuildCreateOrConnectWithoutActInput
    upsert?: GuildUpsertWithoutActInput
    disconnect?: GuildWhereInput | boolean
    delete?: GuildWhereInput | boolean
    connect?: GuildWhereUniqueInput
    update?: XOR<XOR<GuildUpdateToOneWithWhereWithoutActInput, GuildUpdateWithoutActInput>, GuildUncheckedUpdateWithoutActInput>
  }

  export type CalendarEventUpdateManyWithoutActsNestedInput = {
    create?: XOR<CalendarEventCreateWithoutActsInput, CalendarEventUncheckedCreateWithoutActsInput> | CalendarEventCreateWithoutActsInput[] | CalendarEventUncheckedCreateWithoutActsInput[]
    connectOrCreate?: CalendarEventCreateOrConnectWithoutActsInput | CalendarEventCreateOrConnectWithoutActsInput[]
    upsert?: CalendarEventUpsertWithWhereUniqueWithoutActsInput | CalendarEventUpsertWithWhereUniqueWithoutActsInput[]
    set?: CalendarEventWhereUniqueInput | CalendarEventWhereUniqueInput[]
    disconnect?: CalendarEventWhereUniqueInput | CalendarEventWhereUniqueInput[]
    delete?: CalendarEventWhereUniqueInput | CalendarEventWhereUniqueInput[]
    connect?: CalendarEventWhereUniqueInput | CalendarEventWhereUniqueInput[]
    update?: CalendarEventUpdateWithWhereUniqueWithoutActsInput | CalendarEventUpdateWithWhereUniqueWithoutActsInput[]
    updateMany?: CalendarEventUpdateManyWithWhereWithoutActsInput | CalendarEventUpdateManyWithWhereWithoutActsInput[]
    deleteMany?: CalendarEventScalarWhereInput | CalendarEventScalarWhereInput[]
  }

  export type GuildUncheckedUpdateOneWithoutActNestedInput = {
    create?: XOR<GuildCreateWithoutActInput, GuildUncheckedCreateWithoutActInput>
    connectOrCreate?: GuildCreateOrConnectWithoutActInput
    upsert?: GuildUpsertWithoutActInput
    disconnect?: GuildWhereInput | boolean
    delete?: GuildWhereInput | boolean
    connect?: GuildWhereUniqueInput
    update?: XOR<XOR<GuildUpdateToOneWithWhereWithoutActInput, GuildUpdateWithoutActInput>, GuildUncheckedUpdateWithoutActInput>
  }

  export type CalendarEventUncheckedUpdateManyWithoutActsNestedInput = {
    create?: XOR<CalendarEventCreateWithoutActsInput, CalendarEventUncheckedCreateWithoutActsInput> | CalendarEventCreateWithoutActsInput[] | CalendarEventUncheckedCreateWithoutActsInput[]
    connectOrCreate?: CalendarEventCreateOrConnectWithoutActsInput | CalendarEventCreateOrConnectWithoutActsInput[]
    upsert?: CalendarEventUpsertWithWhereUniqueWithoutActsInput | CalendarEventUpsertWithWhereUniqueWithoutActsInput[]
    set?: CalendarEventWhereUniqueInput | CalendarEventWhereUniqueInput[]
    disconnect?: CalendarEventWhereUniqueInput | CalendarEventWhereUniqueInput[]
    delete?: CalendarEventWhereUniqueInput | CalendarEventWhereUniqueInput[]
    connect?: CalendarEventWhereUniqueInput | CalendarEventWhereUniqueInput[]
    update?: CalendarEventUpdateWithWhereUniqueWithoutActsInput | CalendarEventUpdateWithWhereUniqueWithoutActsInput[]
    updateMany?: CalendarEventUpdateManyWithWhereWithoutActsInput | CalendarEventUpdateManyWithWhereWithoutActsInput[]
    deleteMany?: CalendarEventScalarWhereInput | CalendarEventScalarWhereInput[]
  }

  export type GuildCreateNestedOneWithoutVenueInput = {
    create?: XOR<GuildCreateWithoutVenueInput, GuildUncheckedCreateWithoutVenueInput>
    connectOrCreate?: GuildCreateOrConnectWithoutVenueInput
    connect?: GuildWhereUniqueInput
  }

  export type CalendarEventCreateNestedManyWithoutVenueInput = {
    create?: XOR<CalendarEventCreateWithoutVenueInput, CalendarEventUncheckedCreateWithoutVenueInput> | CalendarEventCreateWithoutVenueInput[] | CalendarEventUncheckedCreateWithoutVenueInput[]
    connectOrCreate?: CalendarEventCreateOrConnectWithoutVenueInput | CalendarEventCreateOrConnectWithoutVenueInput[]
    createMany?: CalendarEventCreateManyVenueInputEnvelope
    connect?: CalendarEventWhereUniqueInput | CalendarEventWhereUniqueInput[]
  }

  export type GuildUncheckedCreateNestedOneWithoutVenueInput = {
    create?: XOR<GuildCreateWithoutVenueInput, GuildUncheckedCreateWithoutVenueInput>
    connectOrCreate?: GuildCreateOrConnectWithoutVenueInput
    connect?: GuildWhereUniqueInput
  }

  export type CalendarEventUncheckedCreateNestedManyWithoutVenueInput = {
    create?: XOR<CalendarEventCreateWithoutVenueInput, CalendarEventUncheckedCreateWithoutVenueInput> | CalendarEventCreateWithoutVenueInput[] | CalendarEventUncheckedCreateWithoutVenueInput[]
    connectOrCreate?: CalendarEventCreateOrConnectWithoutVenueInput | CalendarEventCreateOrConnectWithoutVenueInput[]
    createMany?: CalendarEventCreateManyVenueInputEnvelope
    connect?: CalendarEventWhereUniqueInput | CalendarEventWhereUniqueInput[]
  }

  export type GuildUpdateOneWithoutVenueNestedInput = {
    create?: XOR<GuildCreateWithoutVenueInput, GuildUncheckedCreateWithoutVenueInput>
    connectOrCreate?: GuildCreateOrConnectWithoutVenueInput
    upsert?: GuildUpsertWithoutVenueInput
    disconnect?: GuildWhereInput | boolean
    delete?: GuildWhereInput | boolean
    connect?: GuildWhereUniqueInput
    update?: XOR<XOR<GuildUpdateToOneWithWhereWithoutVenueInput, GuildUpdateWithoutVenueInput>, GuildUncheckedUpdateWithoutVenueInput>
  }

  export type CalendarEventUpdateManyWithoutVenueNestedInput = {
    create?: XOR<CalendarEventCreateWithoutVenueInput, CalendarEventUncheckedCreateWithoutVenueInput> | CalendarEventCreateWithoutVenueInput[] | CalendarEventUncheckedCreateWithoutVenueInput[]
    connectOrCreate?: CalendarEventCreateOrConnectWithoutVenueInput | CalendarEventCreateOrConnectWithoutVenueInput[]
    upsert?: CalendarEventUpsertWithWhereUniqueWithoutVenueInput | CalendarEventUpsertWithWhereUniqueWithoutVenueInput[]
    createMany?: CalendarEventCreateManyVenueInputEnvelope
    set?: CalendarEventWhereUniqueInput | CalendarEventWhereUniqueInput[]
    disconnect?: CalendarEventWhereUniqueInput | CalendarEventWhereUniqueInput[]
    delete?: CalendarEventWhereUniqueInput | CalendarEventWhereUniqueInput[]
    connect?: CalendarEventWhereUniqueInput | CalendarEventWhereUniqueInput[]
    update?: CalendarEventUpdateWithWhereUniqueWithoutVenueInput | CalendarEventUpdateWithWhereUniqueWithoutVenueInput[]
    updateMany?: CalendarEventUpdateManyWithWhereWithoutVenueInput | CalendarEventUpdateManyWithWhereWithoutVenueInput[]
    deleteMany?: CalendarEventScalarWhereInput | CalendarEventScalarWhereInput[]
  }

  export type GuildUncheckedUpdateOneWithoutVenueNestedInput = {
    create?: XOR<GuildCreateWithoutVenueInput, GuildUncheckedCreateWithoutVenueInput>
    connectOrCreate?: GuildCreateOrConnectWithoutVenueInput
    upsert?: GuildUpsertWithoutVenueInput
    disconnect?: GuildWhereInput | boolean
    delete?: GuildWhereInput | boolean
    connect?: GuildWhereUniqueInput
    update?: XOR<XOR<GuildUpdateToOneWithWhereWithoutVenueInput, GuildUpdateWithoutVenueInput>, GuildUncheckedUpdateWithoutVenueInput>
  }

  export type CalendarEventUncheckedUpdateManyWithoutVenueNestedInput = {
    create?: XOR<CalendarEventCreateWithoutVenueInput, CalendarEventUncheckedCreateWithoutVenueInput> | CalendarEventCreateWithoutVenueInput[] | CalendarEventUncheckedCreateWithoutVenueInput[]
    connectOrCreate?: CalendarEventCreateOrConnectWithoutVenueInput | CalendarEventCreateOrConnectWithoutVenueInput[]
    upsert?: CalendarEventUpsertWithWhereUniqueWithoutVenueInput | CalendarEventUpsertWithWhereUniqueWithoutVenueInput[]
    createMany?: CalendarEventCreateManyVenueInputEnvelope
    set?: CalendarEventWhereUniqueInput | CalendarEventWhereUniqueInput[]
    disconnect?: CalendarEventWhereUniqueInput | CalendarEventWhereUniqueInput[]
    delete?: CalendarEventWhereUniqueInput | CalendarEventWhereUniqueInput[]
    connect?: CalendarEventWhereUniqueInput | CalendarEventWhereUniqueInput[]
    update?: CalendarEventUpdateWithWhereUniqueWithoutVenueInput | CalendarEventUpdateWithWhereUniqueWithoutVenueInput[]
    updateMany?: CalendarEventUpdateManyWithWhereWithoutVenueInput | CalendarEventUpdateManyWithWhereWithoutVenueInput[]
    deleteMany?: CalendarEventScalarWhereInput | CalendarEventScalarWhereInput[]
  }

  export type GuildCreateNestedOneWithoutClubInput = {
    create?: XOR<GuildCreateWithoutClubInput, GuildUncheckedCreateWithoutClubInput>
    connectOrCreate?: GuildCreateOrConnectWithoutClubInput
    connect?: GuildWhereUniqueInput
  }

  export type GuildUncheckedCreateNestedOneWithoutClubInput = {
    create?: XOR<GuildCreateWithoutClubInput, GuildUncheckedCreateWithoutClubInput>
    connectOrCreate?: GuildCreateOrConnectWithoutClubInput
    connect?: GuildWhereUniqueInput
  }

  export type GuildUpdateOneWithoutClubNestedInput = {
    create?: XOR<GuildCreateWithoutClubInput, GuildUncheckedCreateWithoutClubInput>
    connectOrCreate?: GuildCreateOrConnectWithoutClubInput
    upsert?: GuildUpsertWithoutClubInput
    disconnect?: GuildWhereInput | boolean
    delete?: GuildWhereInput | boolean
    connect?: GuildWhereUniqueInput
    update?: XOR<XOR<GuildUpdateToOneWithWhereWithoutClubInput, GuildUpdateWithoutClubInput>, GuildUncheckedUpdateWithoutClubInput>
  }

  export type GuildUncheckedUpdateOneWithoutClubNestedInput = {
    create?: XOR<GuildCreateWithoutClubInput, GuildUncheckedCreateWithoutClubInput>
    connectOrCreate?: GuildCreateOrConnectWithoutClubInput
    upsert?: GuildUpsertWithoutClubInput
    disconnect?: GuildWhereInput | boolean
    delete?: GuildWhereInput | boolean
    connect?: GuildWhereUniqueInput
    update?: XOR<XOR<GuildUpdateToOneWithWhereWithoutClubInput, GuildUpdateWithoutClubInput>, GuildUncheckedUpdateWithoutClubInput>
  }

  export type VenueCreateNestedOneWithoutCalendarEventsInput = {
    create?: XOR<VenueCreateWithoutCalendarEventsInput, VenueUncheckedCreateWithoutCalendarEventsInput>
    connectOrCreate?: VenueCreateOrConnectWithoutCalendarEventsInput
    connect?: VenueWhereUniqueInput
  }

  export type ActCreateNestedManyWithoutCalendarEventsInput = {
    create?: XOR<ActCreateWithoutCalendarEventsInput, ActUncheckedCreateWithoutCalendarEventsInput> | ActCreateWithoutCalendarEventsInput[] | ActUncheckedCreateWithoutCalendarEventsInput[]
    connectOrCreate?: ActCreateOrConnectWithoutCalendarEventsInput | ActCreateOrConnectWithoutCalendarEventsInput[]
    connect?: ActWhereUniqueInput | ActWhereUniqueInput[]
  }

  export type FeedActivityCreateNestedManyWithoutCalendarEventInput = {
    create?: XOR<FeedActivityCreateWithoutCalendarEventInput, FeedActivityUncheckedCreateWithoutCalendarEventInput> | FeedActivityCreateWithoutCalendarEventInput[] | FeedActivityUncheckedCreateWithoutCalendarEventInput[]
    connectOrCreate?: FeedActivityCreateOrConnectWithoutCalendarEventInput | FeedActivityCreateOrConnectWithoutCalendarEventInput[]
    createMany?: FeedActivityCreateManyCalendarEventInputEnvelope
    connect?: FeedActivityWhereUniqueInput | FeedActivityWhereUniqueInput[]
  }

  export type ActUncheckedCreateNestedManyWithoutCalendarEventsInput = {
    create?: XOR<ActCreateWithoutCalendarEventsInput, ActUncheckedCreateWithoutCalendarEventsInput> | ActCreateWithoutCalendarEventsInput[] | ActUncheckedCreateWithoutCalendarEventsInput[]
    connectOrCreate?: ActCreateOrConnectWithoutCalendarEventsInput | ActCreateOrConnectWithoutCalendarEventsInput[]
    connect?: ActWhereUniqueInput | ActWhereUniqueInput[]
  }

  export type FeedActivityUncheckedCreateNestedManyWithoutCalendarEventInput = {
    create?: XOR<FeedActivityCreateWithoutCalendarEventInput, FeedActivityUncheckedCreateWithoutCalendarEventInput> | FeedActivityCreateWithoutCalendarEventInput[] | FeedActivityUncheckedCreateWithoutCalendarEventInput[]
    connectOrCreate?: FeedActivityCreateOrConnectWithoutCalendarEventInput | FeedActivityCreateOrConnectWithoutCalendarEventInput[]
    createMany?: FeedActivityCreateManyCalendarEventInputEnvelope
    connect?: FeedActivityWhereUniqueInput | FeedActivityWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type VenueUpdateOneRequiredWithoutCalendarEventsNestedInput = {
    create?: XOR<VenueCreateWithoutCalendarEventsInput, VenueUncheckedCreateWithoutCalendarEventsInput>
    connectOrCreate?: VenueCreateOrConnectWithoutCalendarEventsInput
    upsert?: VenueUpsertWithoutCalendarEventsInput
    connect?: VenueWhereUniqueInput
    update?: XOR<XOR<VenueUpdateToOneWithWhereWithoutCalendarEventsInput, VenueUpdateWithoutCalendarEventsInput>, VenueUncheckedUpdateWithoutCalendarEventsInput>
  }

  export type ActUpdateManyWithoutCalendarEventsNestedInput = {
    create?: XOR<ActCreateWithoutCalendarEventsInput, ActUncheckedCreateWithoutCalendarEventsInput> | ActCreateWithoutCalendarEventsInput[] | ActUncheckedCreateWithoutCalendarEventsInput[]
    connectOrCreate?: ActCreateOrConnectWithoutCalendarEventsInput | ActCreateOrConnectWithoutCalendarEventsInput[]
    upsert?: ActUpsertWithWhereUniqueWithoutCalendarEventsInput | ActUpsertWithWhereUniqueWithoutCalendarEventsInput[]
    set?: ActWhereUniqueInput | ActWhereUniqueInput[]
    disconnect?: ActWhereUniqueInput | ActWhereUniqueInput[]
    delete?: ActWhereUniqueInput | ActWhereUniqueInput[]
    connect?: ActWhereUniqueInput | ActWhereUniqueInput[]
    update?: ActUpdateWithWhereUniqueWithoutCalendarEventsInput | ActUpdateWithWhereUniqueWithoutCalendarEventsInput[]
    updateMany?: ActUpdateManyWithWhereWithoutCalendarEventsInput | ActUpdateManyWithWhereWithoutCalendarEventsInput[]
    deleteMany?: ActScalarWhereInput | ActScalarWhereInput[]
  }

  export type FeedActivityUpdateManyWithoutCalendarEventNestedInput = {
    create?: XOR<FeedActivityCreateWithoutCalendarEventInput, FeedActivityUncheckedCreateWithoutCalendarEventInput> | FeedActivityCreateWithoutCalendarEventInput[] | FeedActivityUncheckedCreateWithoutCalendarEventInput[]
    connectOrCreate?: FeedActivityCreateOrConnectWithoutCalendarEventInput | FeedActivityCreateOrConnectWithoutCalendarEventInput[]
    upsert?: FeedActivityUpsertWithWhereUniqueWithoutCalendarEventInput | FeedActivityUpsertWithWhereUniqueWithoutCalendarEventInput[]
    createMany?: FeedActivityCreateManyCalendarEventInputEnvelope
    set?: FeedActivityWhereUniqueInput | FeedActivityWhereUniqueInput[]
    disconnect?: FeedActivityWhereUniqueInput | FeedActivityWhereUniqueInput[]
    delete?: FeedActivityWhereUniqueInput | FeedActivityWhereUniqueInput[]
    connect?: FeedActivityWhereUniqueInput | FeedActivityWhereUniqueInput[]
    update?: FeedActivityUpdateWithWhereUniqueWithoutCalendarEventInput | FeedActivityUpdateWithWhereUniqueWithoutCalendarEventInput[]
    updateMany?: FeedActivityUpdateManyWithWhereWithoutCalendarEventInput | FeedActivityUpdateManyWithWhereWithoutCalendarEventInput[]
    deleteMany?: FeedActivityScalarWhereInput | FeedActivityScalarWhereInput[]
  }

  export type ActUncheckedUpdateManyWithoutCalendarEventsNestedInput = {
    create?: XOR<ActCreateWithoutCalendarEventsInput, ActUncheckedCreateWithoutCalendarEventsInput> | ActCreateWithoutCalendarEventsInput[] | ActUncheckedCreateWithoutCalendarEventsInput[]
    connectOrCreate?: ActCreateOrConnectWithoutCalendarEventsInput | ActCreateOrConnectWithoutCalendarEventsInput[]
    upsert?: ActUpsertWithWhereUniqueWithoutCalendarEventsInput | ActUpsertWithWhereUniqueWithoutCalendarEventsInput[]
    set?: ActWhereUniqueInput | ActWhereUniqueInput[]
    disconnect?: ActWhereUniqueInput | ActWhereUniqueInput[]
    delete?: ActWhereUniqueInput | ActWhereUniqueInput[]
    connect?: ActWhereUniqueInput | ActWhereUniqueInput[]
    update?: ActUpdateWithWhereUniqueWithoutCalendarEventsInput | ActUpdateWithWhereUniqueWithoutCalendarEventsInput[]
    updateMany?: ActUpdateManyWithWhereWithoutCalendarEventsInput | ActUpdateManyWithWhereWithoutCalendarEventsInput[]
    deleteMany?: ActScalarWhereInput | ActScalarWhereInput[]
  }

  export type FeedActivityUncheckedUpdateManyWithoutCalendarEventNestedInput = {
    create?: XOR<FeedActivityCreateWithoutCalendarEventInput, FeedActivityUncheckedCreateWithoutCalendarEventInput> | FeedActivityCreateWithoutCalendarEventInput[] | FeedActivityUncheckedCreateWithoutCalendarEventInput[]
    connectOrCreate?: FeedActivityCreateOrConnectWithoutCalendarEventInput | FeedActivityCreateOrConnectWithoutCalendarEventInput[]
    upsert?: FeedActivityUpsertWithWhereUniqueWithoutCalendarEventInput | FeedActivityUpsertWithWhereUniqueWithoutCalendarEventInput[]
    createMany?: FeedActivityCreateManyCalendarEventInputEnvelope
    set?: FeedActivityWhereUniqueInput | FeedActivityWhereUniqueInput[]
    disconnect?: FeedActivityWhereUniqueInput | FeedActivityWhereUniqueInput[]
    delete?: FeedActivityWhereUniqueInput | FeedActivityWhereUniqueInput[]
    connect?: FeedActivityWhereUniqueInput | FeedActivityWhereUniqueInput[]
    update?: FeedActivityUpdateWithWhereUniqueWithoutCalendarEventInput | FeedActivityUpdateWithWhereUniqueWithoutCalendarEventInput[]
    updateMany?: FeedActivityUpdateManyWithWhereWithoutCalendarEventInput | FeedActivityUpdateManyWithWhereWithoutCalendarEventInput[]
    deleteMany?: FeedActivityScalarWhereInput | FeedActivityScalarWhereInput[]
  }

  export type CalendarEventCreateNestedOneWithoutFeedActivitiesInput = {
    create?: XOR<CalendarEventCreateWithoutFeedActivitiesInput, CalendarEventUncheckedCreateWithoutFeedActivitiesInput>
    connectOrCreate?: CalendarEventCreateOrConnectWithoutFeedActivitiesInput
    connect?: CalendarEventWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutFeedActivitiesInput = {
    create?: XOR<UserCreateWithoutFeedActivitiesInput, UserUncheckedCreateWithoutFeedActivitiesInput>
    connectOrCreate?: UserCreateOrConnectWithoutFeedActivitiesInput
    connect?: UserWhereUniqueInput
  }

  export type CalendarEventUpdateOneWithoutFeedActivitiesNestedInput = {
    create?: XOR<CalendarEventCreateWithoutFeedActivitiesInput, CalendarEventUncheckedCreateWithoutFeedActivitiesInput>
    connectOrCreate?: CalendarEventCreateOrConnectWithoutFeedActivitiesInput
    upsert?: CalendarEventUpsertWithoutFeedActivitiesInput
    disconnect?: CalendarEventWhereInput | boolean
    delete?: CalendarEventWhereInput | boolean
    connect?: CalendarEventWhereUniqueInput
    update?: XOR<XOR<CalendarEventUpdateToOneWithWhereWithoutFeedActivitiesInput, CalendarEventUpdateWithoutFeedActivitiesInput>, CalendarEventUncheckedUpdateWithoutFeedActivitiesInput>
  }

  export type UserUpdateOneWithoutFeedActivitiesNestedInput = {
    create?: XOR<UserCreateWithoutFeedActivitiesInput, UserUncheckedCreateWithoutFeedActivitiesInput>
    connectOrCreate?: UserCreateOrConnectWithoutFeedActivitiesInput
    upsert?: UserUpsertWithoutFeedActivitiesInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutFeedActivitiesInput, UserUpdateWithoutFeedActivitiesInput>, UserUncheckedUpdateWithoutFeedActivitiesInput>
  }

  export type GuildCreateNestedOneWithoutInvitationsInput = {
    create?: XOR<GuildCreateWithoutInvitationsInput, GuildUncheckedCreateWithoutInvitationsInput>
    connectOrCreate?: GuildCreateOrConnectWithoutInvitationsInput
    connect?: GuildWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutReceivedInvitationsInput = {
    create?: XOR<UserCreateWithoutReceivedInvitationsInput, UserUncheckedCreateWithoutReceivedInvitationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutReceivedInvitationsInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutSentInvitationsInput = {
    create?: XOR<UserCreateWithoutSentInvitationsInput, UserUncheckedCreateWithoutSentInvitationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSentInvitationsInput
    connect?: UserWhereUniqueInput
  }

  export type EnumGuildInvitationStatusFieldUpdateOperationsInput = {
    set?: $Enums.GuildInvitationStatus
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type GuildUpdateOneRequiredWithoutInvitationsNestedInput = {
    create?: XOR<GuildCreateWithoutInvitationsInput, GuildUncheckedCreateWithoutInvitationsInput>
    connectOrCreate?: GuildCreateOrConnectWithoutInvitationsInput
    upsert?: GuildUpsertWithoutInvitationsInput
    connect?: GuildWhereUniqueInput
    update?: XOR<XOR<GuildUpdateToOneWithWhereWithoutInvitationsInput, GuildUpdateWithoutInvitationsInput>, GuildUncheckedUpdateWithoutInvitationsInput>
  }

  export type UserUpdateOneRequiredWithoutReceivedInvitationsNestedInput = {
    create?: XOR<UserCreateWithoutReceivedInvitationsInput, UserUncheckedCreateWithoutReceivedInvitationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutReceivedInvitationsInput
    upsert?: UserUpsertWithoutReceivedInvitationsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutReceivedInvitationsInput, UserUpdateWithoutReceivedInvitationsInput>, UserUncheckedUpdateWithoutReceivedInvitationsInput>
  }

  export type UserUpdateOneWithoutSentInvitationsNestedInput = {
    create?: XOR<UserCreateWithoutSentInvitationsInput, UserUncheckedCreateWithoutSentInvitationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSentInvitationsInput
    upsert?: UserUpsertWithoutSentInvitationsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSentInvitationsInput, UserUpdateWithoutSentInvitationsInput>, UserUncheckedUpdateWithoutSentInvitationsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumFollowEntityTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.FollowEntityType | EnumFollowEntityTypeFieldRefInput<$PrismaModel>
    in?: $Enums.FollowEntityType[] | ListEnumFollowEntityTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.FollowEntityType[] | ListEnumFollowEntityTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumFollowEntityTypeFilter<$PrismaModel> | $Enums.FollowEntityType
  }

  export type NestedEnumFollowEntityTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.FollowEntityType | EnumFollowEntityTypeFieldRefInput<$PrismaModel>
    in?: $Enums.FollowEntityType[] | ListEnumFollowEntityTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.FollowEntityType[] | ListEnumFollowEntityTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumFollowEntityTypeWithAggregatesFilter<$PrismaModel> | $Enums.FollowEntityType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumFollowEntityTypeFilter<$PrismaModel>
    _max?: NestedEnumFollowEntityTypeFilter<$PrismaModel>
  }

  export type NestedEnumGuildTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.GuildType | EnumGuildTypeFieldRefInput<$PrismaModel>
    in?: $Enums.GuildType[] | ListEnumGuildTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.GuildType[] | ListEnumGuildTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumGuildTypeFilter<$PrismaModel> | $Enums.GuildType
  }

  export type NestedEnumGuildTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.GuildType | EnumGuildTypeFieldRefInput<$PrismaModel>
    in?: $Enums.GuildType[] | ListEnumGuildTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.GuildType[] | ListEnumGuildTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumGuildTypeWithAggregatesFilter<$PrismaModel> | $Enums.GuildType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumGuildTypeFilter<$PrismaModel>
    _max?: NestedEnumGuildTypeFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedEnumGuildInvitationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.GuildInvitationStatus | EnumGuildInvitationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.GuildInvitationStatus[] | ListEnumGuildInvitationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.GuildInvitationStatus[] | ListEnumGuildInvitationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumGuildInvitationStatusFilter<$PrismaModel> | $Enums.GuildInvitationStatus
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedEnumGuildInvitationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.GuildInvitationStatus | EnumGuildInvitationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.GuildInvitationStatus[] | ListEnumGuildInvitationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.GuildInvitationStatus[] | ListEnumGuildInvitationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumGuildInvitationStatusWithAggregatesFilter<$PrismaModel> | $Enums.GuildInvitationStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumGuildInvitationStatusFilter<$PrismaModel>
    _max?: NestedEnumGuildInvitationStatusFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type GuildCreateWithoutCreatedByInput = {
    guildId?: string
    name: string
    guildType: $Enums.GuildType
    createdAt?: Date | string
    currentOwner: UserCreateNestedOneWithoutOwnedGuildsInput
    members?: UserCreateNestedManyWithoutMemberOfGuildsInput
    act?: ActCreateNestedOneWithoutGuildInput
    venue?: VenueCreateNestedOneWithoutGuildInput
    club?: ClubCreateNestedOneWithoutGuildInput
    follows?: FollowCreateNestedManyWithoutGuildInput
    invitations?: GuildInvitationCreateNestedManyWithoutGuildInput
  }

  export type GuildUncheckedCreateWithoutCreatedByInput = {
    guildId?: string
    name: string
    guildType: $Enums.GuildType
    createdAt?: Date | string
    currentOwnerId: string
    actId?: string | null
    venueId?: string | null
    clubId?: string | null
    members?: UserUncheckedCreateNestedManyWithoutMemberOfGuildsInput
    follows?: FollowUncheckedCreateNestedManyWithoutGuildInput
    invitations?: GuildInvitationUncheckedCreateNestedManyWithoutGuildInput
  }

  export type GuildCreateOrConnectWithoutCreatedByInput = {
    where: GuildWhereUniqueInput
    create: XOR<GuildCreateWithoutCreatedByInput, GuildUncheckedCreateWithoutCreatedByInput>
  }

  export type GuildCreateManyCreatedByInputEnvelope = {
    data: GuildCreateManyCreatedByInput | GuildCreateManyCreatedByInput[]
    skipDuplicates?: boolean
  }

  export type GuildCreateWithoutCurrentOwnerInput = {
    guildId?: string
    name: string
    guildType: $Enums.GuildType
    createdAt?: Date | string
    createdBy?: UserCreateNestedOneWithoutCreatedGuildsInput
    members?: UserCreateNestedManyWithoutMemberOfGuildsInput
    act?: ActCreateNestedOneWithoutGuildInput
    venue?: VenueCreateNestedOneWithoutGuildInput
    club?: ClubCreateNestedOneWithoutGuildInput
    follows?: FollowCreateNestedManyWithoutGuildInput
    invitations?: GuildInvitationCreateNestedManyWithoutGuildInput
  }

  export type GuildUncheckedCreateWithoutCurrentOwnerInput = {
    guildId?: string
    name: string
    guildType: $Enums.GuildType
    createdAt?: Date | string
    createdById?: string | null
    actId?: string | null
    venueId?: string | null
    clubId?: string | null
    members?: UserUncheckedCreateNestedManyWithoutMemberOfGuildsInput
    follows?: FollowUncheckedCreateNestedManyWithoutGuildInput
    invitations?: GuildInvitationUncheckedCreateNestedManyWithoutGuildInput
  }

  export type GuildCreateOrConnectWithoutCurrentOwnerInput = {
    where: GuildWhereUniqueInput
    create: XOR<GuildCreateWithoutCurrentOwnerInput, GuildUncheckedCreateWithoutCurrentOwnerInput>
  }

  export type GuildCreateManyCurrentOwnerInputEnvelope = {
    data: GuildCreateManyCurrentOwnerInput | GuildCreateManyCurrentOwnerInput[]
    skipDuplicates?: boolean
  }

  export type GuildCreateWithoutMembersInput = {
    guildId?: string
    name: string
    guildType: $Enums.GuildType
    createdAt?: Date | string
    createdBy?: UserCreateNestedOneWithoutCreatedGuildsInput
    currentOwner: UserCreateNestedOneWithoutOwnedGuildsInput
    act?: ActCreateNestedOneWithoutGuildInput
    venue?: VenueCreateNestedOneWithoutGuildInput
    club?: ClubCreateNestedOneWithoutGuildInput
    follows?: FollowCreateNestedManyWithoutGuildInput
    invitations?: GuildInvitationCreateNestedManyWithoutGuildInput
  }

  export type GuildUncheckedCreateWithoutMembersInput = {
    guildId?: string
    name: string
    guildType: $Enums.GuildType
    createdAt?: Date | string
    createdById?: string | null
    currentOwnerId: string
    actId?: string | null
    venueId?: string | null
    clubId?: string | null
    follows?: FollowUncheckedCreateNestedManyWithoutGuildInput
    invitations?: GuildInvitationUncheckedCreateNestedManyWithoutGuildInput
  }

  export type GuildCreateOrConnectWithoutMembersInput = {
    where: GuildWhereUniqueInput
    create: XOR<GuildCreateWithoutMembersInput, GuildUncheckedCreateWithoutMembersInput>
  }

  export type FollowCreateWithoutUserInput = {
    followId?: string
    entityType: $Enums.FollowEntityType
    createdAt?: Date | string
    followedUser?: UserCreateNestedOneWithoutFollowedByInput
    tag?: TagCreateNestedOneWithoutFollowsInput
    guild?: GuildCreateNestedOneWithoutFollowsInput
  }

  export type FollowUncheckedCreateWithoutUserInput = {
    followId?: string
    entityType: $Enums.FollowEntityType
    followedUserId?: string | null
    tagId?: string | null
    guildId?: string | null
    createdAt?: Date | string
  }

  export type FollowCreateOrConnectWithoutUserInput = {
    where: FollowWhereUniqueInput
    create: XOR<FollowCreateWithoutUserInput, FollowUncheckedCreateWithoutUserInput>
  }

  export type FollowCreateManyUserInputEnvelope = {
    data: FollowCreateManyUserInput | FollowCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type FollowCreateWithoutFollowedUserInput = {
    followId?: string
    entityType: $Enums.FollowEntityType
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutFollowsInput
    tag?: TagCreateNestedOneWithoutFollowsInput
    guild?: GuildCreateNestedOneWithoutFollowsInput
  }

  export type FollowUncheckedCreateWithoutFollowedUserInput = {
    followId?: string
    userId: string
    entityType: $Enums.FollowEntityType
    tagId?: string | null
    guildId?: string | null
    createdAt?: Date | string
  }

  export type FollowCreateOrConnectWithoutFollowedUserInput = {
    where: FollowWhereUniqueInput
    create: XOR<FollowCreateWithoutFollowedUserInput, FollowUncheckedCreateWithoutFollowedUserInput>
  }

  export type FollowCreateManyFollowedUserInputEnvelope = {
    data: FollowCreateManyFollowedUserInput | FollowCreateManyFollowedUserInput[]
    skipDuplicates?: boolean
  }

  export type FeedActivityCreateWithoutUserInput = {
    activityId?: string
    activityType: string
    createdAt?: Date | string
    subjectType: string
    subjectId: string
    calendarEvent?: CalendarEventCreateNestedOneWithoutFeedActivitiesInput
  }

  export type FeedActivityUncheckedCreateWithoutUserInput = {
    activityId?: string
    activityType: string
    createdAt?: Date | string
    subjectType: string
    subjectId: string
    calendarEventId?: string | null
  }

  export type FeedActivityCreateOrConnectWithoutUserInput = {
    where: FeedActivityWhereUniqueInput
    create: XOR<FeedActivityCreateWithoutUserInput, FeedActivityUncheckedCreateWithoutUserInput>
  }

  export type FeedActivityCreateManyUserInputEnvelope = {
    data: FeedActivityCreateManyUserInput | FeedActivityCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type GuildInvitationCreateWithoutInvitedByInput = {
    invitationId?: string
    status?: $Enums.GuildInvitationStatus
    createdAt?: Date | string
    respondedAt?: Date | string | null
    guild: GuildCreateNestedOneWithoutInvitationsInput
    invitedUser: UserCreateNestedOneWithoutReceivedInvitationsInput
  }

  export type GuildInvitationUncheckedCreateWithoutInvitedByInput = {
    invitationId?: string
    guildId: string
    invitedUserId: string
    status?: $Enums.GuildInvitationStatus
    createdAt?: Date | string
    respondedAt?: Date | string | null
  }

  export type GuildInvitationCreateOrConnectWithoutInvitedByInput = {
    where: GuildInvitationWhereUniqueInput
    create: XOR<GuildInvitationCreateWithoutInvitedByInput, GuildInvitationUncheckedCreateWithoutInvitedByInput>
  }

  export type GuildInvitationCreateManyInvitedByInputEnvelope = {
    data: GuildInvitationCreateManyInvitedByInput | GuildInvitationCreateManyInvitedByInput[]
    skipDuplicates?: boolean
  }

  export type GuildInvitationCreateWithoutInvitedUserInput = {
    invitationId?: string
    status?: $Enums.GuildInvitationStatus
    createdAt?: Date | string
    respondedAt?: Date | string | null
    guild: GuildCreateNestedOneWithoutInvitationsInput
    invitedBy?: UserCreateNestedOneWithoutSentInvitationsInput
  }

  export type GuildInvitationUncheckedCreateWithoutInvitedUserInput = {
    invitationId?: string
    guildId: string
    invitedById?: string | null
    status?: $Enums.GuildInvitationStatus
    createdAt?: Date | string
    respondedAt?: Date | string | null
  }

  export type GuildInvitationCreateOrConnectWithoutInvitedUserInput = {
    where: GuildInvitationWhereUniqueInput
    create: XOR<GuildInvitationCreateWithoutInvitedUserInput, GuildInvitationUncheckedCreateWithoutInvitedUserInput>
  }

  export type GuildInvitationCreateManyInvitedUserInputEnvelope = {
    data: GuildInvitationCreateManyInvitedUserInput | GuildInvitationCreateManyInvitedUserInput[]
    skipDuplicates?: boolean
  }

  export type GuildUpsertWithWhereUniqueWithoutCreatedByInput = {
    where: GuildWhereUniqueInput
    update: XOR<GuildUpdateWithoutCreatedByInput, GuildUncheckedUpdateWithoutCreatedByInput>
    create: XOR<GuildCreateWithoutCreatedByInput, GuildUncheckedCreateWithoutCreatedByInput>
  }

  export type GuildUpdateWithWhereUniqueWithoutCreatedByInput = {
    where: GuildWhereUniqueInput
    data: XOR<GuildUpdateWithoutCreatedByInput, GuildUncheckedUpdateWithoutCreatedByInput>
  }

  export type GuildUpdateManyWithWhereWithoutCreatedByInput = {
    where: GuildScalarWhereInput
    data: XOR<GuildUpdateManyMutationInput, GuildUncheckedUpdateManyWithoutCreatedByInput>
  }

  export type GuildScalarWhereInput = {
    AND?: GuildScalarWhereInput | GuildScalarWhereInput[]
    OR?: GuildScalarWhereInput[]
    NOT?: GuildScalarWhereInput | GuildScalarWhereInput[]
    guildId?: StringFilter<"Guild"> | string
    name?: StringFilter<"Guild"> | string
    guildType?: EnumGuildTypeFilter<"Guild"> | $Enums.GuildType
    createdAt?: DateTimeFilter<"Guild"> | Date | string
    createdById?: StringNullableFilter<"Guild"> | string | null
    currentOwnerId?: StringFilter<"Guild"> | string
    actId?: StringNullableFilter<"Guild"> | string | null
    venueId?: StringNullableFilter<"Guild"> | string | null
    clubId?: StringNullableFilter<"Guild"> | string | null
  }

  export type GuildUpsertWithWhereUniqueWithoutCurrentOwnerInput = {
    where: GuildWhereUniqueInput
    update: XOR<GuildUpdateWithoutCurrentOwnerInput, GuildUncheckedUpdateWithoutCurrentOwnerInput>
    create: XOR<GuildCreateWithoutCurrentOwnerInput, GuildUncheckedCreateWithoutCurrentOwnerInput>
  }

  export type GuildUpdateWithWhereUniqueWithoutCurrentOwnerInput = {
    where: GuildWhereUniqueInput
    data: XOR<GuildUpdateWithoutCurrentOwnerInput, GuildUncheckedUpdateWithoutCurrentOwnerInput>
  }

  export type GuildUpdateManyWithWhereWithoutCurrentOwnerInput = {
    where: GuildScalarWhereInput
    data: XOR<GuildUpdateManyMutationInput, GuildUncheckedUpdateManyWithoutCurrentOwnerInput>
  }

  export type GuildUpsertWithWhereUniqueWithoutMembersInput = {
    where: GuildWhereUniqueInput
    update: XOR<GuildUpdateWithoutMembersInput, GuildUncheckedUpdateWithoutMembersInput>
    create: XOR<GuildCreateWithoutMembersInput, GuildUncheckedCreateWithoutMembersInput>
  }

  export type GuildUpdateWithWhereUniqueWithoutMembersInput = {
    where: GuildWhereUniqueInput
    data: XOR<GuildUpdateWithoutMembersInput, GuildUncheckedUpdateWithoutMembersInput>
  }

  export type GuildUpdateManyWithWhereWithoutMembersInput = {
    where: GuildScalarWhereInput
    data: XOR<GuildUpdateManyMutationInput, GuildUncheckedUpdateManyWithoutMembersInput>
  }

  export type FollowUpsertWithWhereUniqueWithoutUserInput = {
    where: FollowWhereUniqueInput
    update: XOR<FollowUpdateWithoutUserInput, FollowUncheckedUpdateWithoutUserInput>
    create: XOR<FollowCreateWithoutUserInput, FollowUncheckedCreateWithoutUserInput>
  }

  export type FollowUpdateWithWhereUniqueWithoutUserInput = {
    where: FollowWhereUniqueInput
    data: XOR<FollowUpdateWithoutUserInput, FollowUncheckedUpdateWithoutUserInput>
  }

  export type FollowUpdateManyWithWhereWithoutUserInput = {
    where: FollowScalarWhereInput
    data: XOR<FollowUpdateManyMutationInput, FollowUncheckedUpdateManyWithoutUserInput>
  }

  export type FollowScalarWhereInput = {
    AND?: FollowScalarWhereInput | FollowScalarWhereInput[]
    OR?: FollowScalarWhereInput[]
    NOT?: FollowScalarWhereInput | FollowScalarWhereInput[]
    followId?: StringFilter<"Follow"> | string
    userId?: StringFilter<"Follow"> | string
    entityType?: EnumFollowEntityTypeFilter<"Follow"> | $Enums.FollowEntityType
    followedUserId?: StringNullableFilter<"Follow"> | string | null
    tagId?: StringNullableFilter<"Follow"> | string | null
    guildId?: StringNullableFilter<"Follow"> | string | null
    createdAt?: DateTimeFilter<"Follow"> | Date | string
  }

  export type FollowUpsertWithWhereUniqueWithoutFollowedUserInput = {
    where: FollowWhereUniqueInput
    update: XOR<FollowUpdateWithoutFollowedUserInput, FollowUncheckedUpdateWithoutFollowedUserInput>
    create: XOR<FollowCreateWithoutFollowedUserInput, FollowUncheckedCreateWithoutFollowedUserInput>
  }

  export type FollowUpdateWithWhereUniqueWithoutFollowedUserInput = {
    where: FollowWhereUniqueInput
    data: XOR<FollowUpdateWithoutFollowedUserInput, FollowUncheckedUpdateWithoutFollowedUserInput>
  }

  export type FollowUpdateManyWithWhereWithoutFollowedUserInput = {
    where: FollowScalarWhereInput
    data: XOR<FollowUpdateManyMutationInput, FollowUncheckedUpdateManyWithoutFollowedUserInput>
  }

  export type FeedActivityUpsertWithWhereUniqueWithoutUserInput = {
    where: FeedActivityWhereUniqueInput
    update: XOR<FeedActivityUpdateWithoutUserInput, FeedActivityUncheckedUpdateWithoutUserInput>
    create: XOR<FeedActivityCreateWithoutUserInput, FeedActivityUncheckedCreateWithoutUserInput>
  }

  export type FeedActivityUpdateWithWhereUniqueWithoutUserInput = {
    where: FeedActivityWhereUniqueInput
    data: XOR<FeedActivityUpdateWithoutUserInput, FeedActivityUncheckedUpdateWithoutUserInput>
  }

  export type FeedActivityUpdateManyWithWhereWithoutUserInput = {
    where: FeedActivityScalarWhereInput
    data: XOR<FeedActivityUpdateManyMutationInput, FeedActivityUncheckedUpdateManyWithoutUserInput>
  }

  export type FeedActivityScalarWhereInput = {
    AND?: FeedActivityScalarWhereInput | FeedActivityScalarWhereInput[]
    OR?: FeedActivityScalarWhereInput[]
    NOT?: FeedActivityScalarWhereInput | FeedActivityScalarWhereInput[]
    activityId?: StringFilter<"FeedActivity"> | string
    activityType?: StringFilter<"FeedActivity"> | string
    createdAt?: DateTimeFilter<"FeedActivity"> | Date | string
    subjectType?: StringFilter<"FeedActivity"> | string
    subjectId?: StringFilter<"FeedActivity"> | string
    calendarEventId?: StringNullableFilter<"FeedActivity"> | string | null
    userId?: StringNullableFilter<"FeedActivity"> | string | null
  }

  export type GuildInvitationUpsertWithWhereUniqueWithoutInvitedByInput = {
    where: GuildInvitationWhereUniqueInput
    update: XOR<GuildInvitationUpdateWithoutInvitedByInput, GuildInvitationUncheckedUpdateWithoutInvitedByInput>
    create: XOR<GuildInvitationCreateWithoutInvitedByInput, GuildInvitationUncheckedCreateWithoutInvitedByInput>
  }

  export type GuildInvitationUpdateWithWhereUniqueWithoutInvitedByInput = {
    where: GuildInvitationWhereUniqueInput
    data: XOR<GuildInvitationUpdateWithoutInvitedByInput, GuildInvitationUncheckedUpdateWithoutInvitedByInput>
  }

  export type GuildInvitationUpdateManyWithWhereWithoutInvitedByInput = {
    where: GuildInvitationScalarWhereInput
    data: XOR<GuildInvitationUpdateManyMutationInput, GuildInvitationUncheckedUpdateManyWithoutInvitedByInput>
  }

  export type GuildInvitationScalarWhereInput = {
    AND?: GuildInvitationScalarWhereInput | GuildInvitationScalarWhereInput[]
    OR?: GuildInvitationScalarWhereInput[]
    NOT?: GuildInvitationScalarWhereInput | GuildInvitationScalarWhereInput[]
    invitationId?: StringFilter<"GuildInvitation"> | string
    guildId?: StringFilter<"GuildInvitation"> | string
    invitedUserId?: StringFilter<"GuildInvitation"> | string
    invitedById?: StringNullableFilter<"GuildInvitation"> | string | null
    status?: EnumGuildInvitationStatusFilter<"GuildInvitation"> | $Enums.GuildInvitationStatus
    createdAt?: DateTimeFilter<"GuildInvitation"> | Date | string
    respondedAt?: DateTimeNullableFilter<"GuildInvitation"> | Date | string | null
  }

  export type GuildInvitationUpsertWithWhereUniqueWithoutInvitedUserInput = {
    where: GuildInvitationWhereUniqueInput
    update: XOR<GuildInvitationUpdateWithoutInvitedUserInput, GuildInvitationUncheckedUpdateWithoutInvitedUserInput>
    create: XOR<GuildInvitationCreateWithoutInvitedUserInput, GuildInvitationUncheckedCreateWithoutInvitedUserInput>
  }

  export type GuildInvitationUpdateWithWhereUniqueWithoutInvitedUserInput = {
    where: GuildInvitationWhereUniqueInput
    data: XOR<GuildInvitationUpdateWithoutInvitedUserInput, GuildInvitationUncheckedUpdateWithoutInvitedUserInput>
  }

  export type GuildInvitationUpdateManyWithWhereWithoutInvitedUserInput = {
    where: GuildInvitationScalarWhereInput
    data: XOR<GuildInvitationUpdateManyMutationInput, GuildInvitationUncheckedUpdateManyWithoutInvitedUserInput>
  }

  export type UserCreateWithoutFollowsInput = {
    userId?: string
    email: string
    displayName?: string | null
    avatar?: string | null
    firebaseUid?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdGuilds?: GuildCreateNestedManyWithoutCreatedByInput
    ownedGuilds?: GuildCreateNestedManyWithoutCurrentOwnerInput
    memberOfGuilds?: GuildCreateNestedManyWithoutMembersInput
    followedBy?: FollowCreateNestedManyWithoutFollowedUserInput
    feedActivities?: FeedActivityCreateNestedManyWithoutUserInput
    sentInvitations?: GuildInvitationCreateNestedManyWithoutInvitedByInput
    receivedInvitations?: GuildInvitationCreateNestedManyWithoutInvitedUserInput
  }

  export type UserUncheckedCreateWithoutFollowsInput = {
    userId?: string
    email: string
    displayName?: string | null
    avatar?: string | null
    firebaseUid?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdGuilds?: GuildUncheckedCreateNestedManyWithoutCreatedByInput
    ownedGuilds?: GuildUncheckedCreateNestedManyWithoutCurrentOwnerInput
    memberOfGuilds?: GuildUncheckedCreateNestedManyWithoutMembersInput
    followedBy?: FollowUncheckedCreateNestedManyWithoutFollowedUserInput
    feedActivities?: FeedActivityUncheckedCreateNestedManyWithoutUserInput
    sentInvitations?: GuildInvitationUncheckedCreateNestedManyWithoutInvitedByInput
    receivedInvitations?: GuildInvitationUncheckedCreateNestedManyWithoutInvitedUserInput
  }

  export type UserCreateOrConnectWithoutFollowsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutFollowsInput, UserUncheckedCreateWithoutFollowsInput>
  }

  export type UserCreateWithoutFollowedByInput = {
    userId?: string
    email: string
    displayName?: string | null
    avatar?: string | null
    firebaseUid?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdGuilds?: GuildCreateNestedManyWithoutCreatedByInput
    ownedGuilds?: GuildCreateNestedManyWithoutCurrentOwnerInput
    memberOfGuilds?: GuildCreateNestedManyWithoutMembersInput
    follows?: FollowCreateNestedManyWithoutUserInput
    feedActivities?: FeedActivityCreateNestedManyWithoutUserInput
    sentInvitations?: GuildInvitationCreateNestedManyWithoutInvitedByInput
    receivedInvitations?: GuildInvitationCreateNestedManyWithoutInvitedUserInput
  }

  export type UserUncheckedCreateWithoutFollowedByInput = {
    userId?: string
    email: string
    displayName?: string | null
    avatar?: string | null
    firebaseUid?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdGuilds?: GuildUncheckedCreateNestedManyWithoutCreatedByInput
    ownedGuilds?: GuildUncheckedCreateNestedManyWithoutCurrentOwnerInput
    memberOfGuilds?: GuildUncheckedCreateNestedManyWithoutMembersInput
    follows?: FollowUncheckedCreateNestedManyWithoutUserInput
    feedActivities?: FeedActivityUncheckedCreateNestedManyWithoutUserInput
    sentInvitations?: GuildInvitationUncheckedCreateNestedManyWithoutInvitedByInput
    receivedInvitations?: GuildInvitationUncheckedCreateNestedManyWithoutInvitedUserInput
  }

  export type UserCreateOrConnectWithoutFollowedByInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutFollowedByInput, UserUncheckedCreateWithoutFollowedByInput>
  }

  export type TagCreateWithoutFollowsInput = {
    tagId?: string
    category: string
    value: string
  }

  export type TagUncheckedCreateWithoutFollowsInput = {
    tagId?: string
    category: string
    value: string
  }

  export type TagCreateOrConnectWithoutFollowsInput = {
    where: TagWhereUniqueInput
    create: XOR<TagCreateWithoutFollowsInput, TagUncheckedCreateWithoutFollowsInput>
  }

  export type GuildCreateWithoutFollowsInput = {
    guildId?: string
    name: string
    guildType: $Enums.GuildType
    createdAt?: Date | string
    createdBy?: UserCreateNestedOneWithoutCreatedGuildsInput
    currentOwner: UserCreateNestedOneWithoutOwnedGuildsInput
    members?: UserCreateNestedManyWithoutMemberOfGuildsInput
    act?: ActCreateNestedOneWithoutGuildInput
    venue?: VenueCreateNestedOneWithoutGuildInput
    club?: ClubCreateNestedOneWithoutGuildInput
    invitations?: GuildInvitationCreateNestedManyWithoutGuildInput
  }

  export type GuildUncheckedCreateWithoutFollowsInput = {
    guildId?: string
    name: string
    guildType: $Enums.GuildType
    createdAt?: Date | string
    createdById?: string | null
    currentOwnerId: string
    actId?: string | null
    venueId?: string | null
    clubId?: string | null
    members?: UserUncheckedCreateNestedManyWithoutMemberOfGuildsInput
    invitations?: GuildInvitationUncheckedCreateNestedManyWithoutGuildInput
  }

  export type GuildCreateOrConnectWithoutFollowsInput = {
    where: GuildWhereUniqueInput
    create: XOR<GuildCreateWithoutFollowsInput, GuildUncheckedCreateWithoutFollowsInput>
  }

  export type UserUpsertWithoutFollowsInput = {
    update: XOR<UserUpdateWithoutFollowsInput, UserUncheckedUpdateWithoutFollowsInput>
    create: XOR<UserCreateWithoutFollowsInput, UserUncheckedCreateWithoutFollowsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutFollowsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutFollowsInput, UserUncheckedUpdateWithoutFollowsInput>
  }

  export type UserUpdateWithoutFollowsInput = {
    userId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    firebaseUid?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdGuilds?: GuildUpdateManyWithoutCreatedByNestedInput
    ownedGuilds?: GuildUpdateManyWithoutCurrentOwnerNestedInput
    memberOfGuilds?: GuildUpdateManyWithoutMembersNestedInput
    followedBy?: FollowUpdateManyWithoutFollowedUserNestedInput
    feedActivities?: FeedActivityUpdateManyWithoutUserNestedInput
    sentInvitations?: GuildInvitationUpdateManyWithoutInvitedByNestedInput
    receivedInvitations?: GuildInvitationUpdateManyWithoutInvitedUserNestedInput
  }

  export type UserUncheckedUpdateWithoutFollowsInput = {
    userId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    firebaseUid?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdGuilds?: GuildUncheckedUpdateManyWithoutCreatedByNestedInput
    ownedGuilds?: GuildUncheckedUpdateManyWithoutCurrentOwnerNestedInput
    memberOfGuilds?: GuildUncheckedUpdateManyWithoutMembersNestedInput
    followedBy?: FollowUncheckedUpdateManyWithoutFollowedUserNestedInput
    feedActivities?: FeedActivityUncheckedUpdateManyWithoutUserNestedInput
    sentInvitations?: GuildInvitationUncheckedUpdateManyWithoutInvitedByNestedInput
    receivedInvitations?: GuildInvitationUncheckedUpdateManyWithoutInvitedUserNestedInput
  }

  export type UserUpsertWithoutFollowedByInput = {
    update: XOR<UserUpdateWithoutFollowedByInput, UserUncheckedUpdateWithoutFollowedByInput>
    create: XOR<UserCreateWithoutFollowedByInput, UserUncheckedCreateWithoutFollowedByInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutFollowedByInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutFollowedByInput, UserUncheckedUpdateWithoutFollowedByInput>
  }

  export type UserUpdateWithoutFollowedByInput = {
    userId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    firebaseUid?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdGuilds?: GuildUpdateManyWithoutCreatedByNestedInput
    ownedGuilds?: GuildUpdateManyWithoutCurrentOwnerNestedInput
    memberOfGuilds?: GuildUpdateManyWithoutMembersNestedInput
    follows?: FollowUpdateManyWithoutUserNestedInput
    feedActivities?: FeedActivityUpdateManyWithoutUserNestedInput
    sentInvitations?: GuildInvitationUpdateManyWithoutInvitedByNestedInput
    receivedInvitations?: GuildInvitationUpdateManyWithoutInvitedUserNestedInput
  }

  export type UserUncheckedUpdateWithoutFollowedByInput = {
    userId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    firebaseUid?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdGuilds?: GuildUncheckedUpdateManyWithoutCreatedByNestedInput
    ownedGuilds?: GuildUncheckedUpdateManyWithoutCurrentOwnerNestedInput
    memberOfGuilds?: GuildUncheckedUpdateManyWithoutMembersNestedInput
    follows?: FollowUncheckedUpdateManyWithoutUserNestedInput
    feedActivities?: FeedActivityUncheckedUpdateManyWithoutUserNestedInput
    sentInvitations?: GuildInvitationUncheckedUpdateManyWithoutInvitedByNestedInput
    receivedInvitations?: GuildInvitationUncheckedUpdateManyWithoutInvitedUserNestedInput
  }

  export type TagUpsertWithoutFollowsInput = {
    update: XOR<TagUpdateWithoutFollowsInput, TagUncheckedUpdateWithoutFollowsInput>
    create: XOR<TagCreateWithoutFollowsInput, TagUncheckedCreateWithoutFollowsInput>
    where?: TagWhereInput
  }

  export type TagUpdateToOneWithWhereWithoutFollowsInput = {
    where?: TagWhereInput
    data: XOR<TagUpdateWithoutFollowsInput, TagUncheckedUpdateWithoutFollowsInput>
  }

  export type TagUpdateWithoutFollowsInput = {
    tagId?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
  }

  export type TagUncheckedUpdateWithoutFollowsInput = {
    tagId?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
  }

  export type GuildUpsertWithoutFollowsInput = {
    update: XOR<GuildUpdateWithoutFollowsInput, GuildUncheckedUpdateWithoutFollowsInput>
    create: XOR<GuildCreateWithoutFollowsInput, GuildUncheckedCreateWithoutFollowsInput>
    where?: GuildWhereInput
  }

  export type GuildUpdateToOneWithWhereWithoutFollowsInput = {
    where?: GuildWhereInput
    data: XOR<GuildUpdateWithoutFollowsInput, GuildUncheckedUpdateWithoutFollowsInput>
  }

  export type GuildUpdateWithoutFollowsInput = {
    guildId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    guildType?: EnumGuildTypeFieldUpdateOperationsInput | $Enums.GuildType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: UserUpdateOneWithoutCreatedGuildsNestedInput
    currentOwner?: UserUpdateOneRequiredWithoutOwnedGuildsNestedInput
    members?: UserUpdateManyWithoutMemberOfGuildsNestedInput
    act?: ActUpdateOneWithoutGuildNestedInput
    venue?: VenueUpdateOneWithoutGuildNestedInput
    club?: ClubUpdateOneWithoutGuildNestedInput
    invitations?: GuildInvitationUpdateManyWithoutGuildNestedInput
  }

  export type GuildUncheckedUpdateWithoutFollowsInput = {
    guildId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    guildType?: EnumGuildTypeFieldUpdateOperationsInput | $Enums.GuildType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdById?: NullableStringFieldUpdateOperationsInput | string | null
    currentOwnerId?: StringFieldUpdateOperationsInput | string
    actId?: NullableStringFieldUpdateOperationsInput | string | null
    venueId?: NullableStringFieldUpdateOperationsInput | string | null
    clubId?: NullableStringFieldUpdateOperationsInput | string | null
    members?: UserUncheckedUpdateManyWithoutMemberOfGuildsNestedInput
    invitations?: GuildInvitationUncheckedUpdateManyWithoutGuildNestedInput
  }

  export type FollowCreateWithoutTagInput = {
    followId?: string
    entityType: $Enums.FollowEntityType
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutFollowsInput
    followedUser?: UserCreateNestedOneWithoutFollowedByInput
    guild?: GuildCreateNestedOneWithoutFollowsInput
  }

  export type FollowUncheckedCreateWithoutTagInput = {
    followId?: string
    userId: string
    entityType: $Enums.FollowEntityType
    followedUserId?: string | null
    guildId?: string | null
    createdAt?: Date | string
  }

  export type FollowCreateOrConnectWithoutTagInput = {
    where: FollowWhereUniqueInput
    create: XOR<FollowCreateWithoutTagInput, FollowUncheckedCreateWithoutTagInput>
  }

  export type FollowCreateManyTagInputEnvelope = {
    data: FollowCreateManyTagInput | FollowCreateManyTagInput[]
    skipDuplicates?: boolean
  }

  export type FollowUpsertWithWhereUniqueWithoutTagInput = {
    where: FollowWhereUniqueInput
    update: XOR<FollowUpdateWithoutTagInput, FollowUncheckedUpdateWithoutTagInput>
    create: XOR<FollowCreateWithoutTagInput, FollowUncheckedCreateWithoutTagInput>
  }

  export type FollowUpdateWithWhereUniqueWithoutTagInput = {
    where: FollowWhereUniqueInput
    data: XOR<FollowUpdateWithoutTagInput, FollowUncheckedUpdateWithoutTagInput>
  }

  export type FollowUpdateManyWithWhereWithoutTagInput = {
    where: FollowScalarWhereInput
    data: XOR<FollowUpdateManyMutationInput, FollowUncheckedUpdateManyWithoutTagInput>
  }

  export type UserCreateWithoutCreatedGuildsInput = {
    userId?: string
    email: string
    displayName?: string | null
    avatar?: string | null
    firebaseUid?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    ownedGuilds?: GuildCreateNestedManyWithoutCurrentOwnerInput
    memberOfGuilds?: GuildCreateNestedManyWithoutMembersInput
    follows?: FollowCreateNestedManyWithoutUserInput
    followedBy?: FollowCreateNestedManyWithoutFollowedUserInput
    feedActivities?: FeedActivityCreateNestedManyWithoutUserInput
    sentInvitations?: GuildInvitationCreateNestedManyWithoutInvitedByInput
    receivedInvitations?: GuildInvitationCreateNestedManyWithoutInvitedUserInput
  }

  export type UserUncheckedCreateWithoutCreatedGuildsInput = {
    userId?: string
    email: string
    displayName?: string | null
    avatar?: string | null
    firebaseUid?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    ownedGuilds?: GuildUncheckedCreateNestedManyWithoutCurrentOwnerInput
    memberOfGuilds?: GuildUncheckedCreateNestedManyWithoutMembersInput
    follows?: FollowUncheckedCreateNestedManyWithoutUserInput
    followedBy?: FollowUncheckedCreateNestedManyWithoutFollowedUserInput
    feedActivities?: FeedActivityUncheckedCreateNestedManyWithoutUserInput
    sentInvitations?: GuildInvitationUncheckedCreateNestedManyWithoutInvitedByInput
    receivedInvitations?: GuildInvitationUncheckedCreateNestedManyWithoutInvitedUserInput
  }

  export type UserCreateOrConnectWithoutCreatedGuildsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCreatedGuildsInput, UserUncheckedCreateWithoutCreatedGuildsInput>
  }

  export type UserCreateWithoutOwnedGuildsInput = {
    userId?: string
    email: string
    displayName?: string | null
    avatar?: string | null
    firebaseUid?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdGuilds?: GuildCreateNestedManyWithoutCreatedByInput
    memberOfGuilds?: GuildCreateNestedManyWithoutMembersInput
    follows?: FollowCreateNestedManyWithoutUserInput
    followedBy?: FollowCreateNestedManyWithoutFollowedUserInput
    feedActivities?: FeedActivityCreateNestedManyWithoutUserInput
    sentInvitations?: GuildInvitationCreateNestedManyWithoutInvitedByInput
    receivedInvitations?: GuildInvitationCreateNestedManyWithoutInvitedUserInput
  }

  export type UserUncheckedCreateWithoutOwnedGuildsInput = {
    userId?: string
    email: string
    displayName?: string | null
    avatar?: string | null
    firebaseUid?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdGuilds?: GuildUncheckedCreateNestedManyWithoutCreatedByInput
    memberOfGuilds?: GuildUncheckedCreateNestedManyWithoutMembersInput
    follows?: FollowUncheckedCreateNestedManyWithoutUserInput
    followedBy?: FollowUncheckedCreateNestedManyWithoutFollowedUserInput
    feedActivities?: FeedActivityUncheckedCreateNestedManyWithoutUserInput
    sentInvitations?: GuildInvitationUncheckedCreateNestedManyWithoutInvitedByInput
    receivedInvitations?: GuildInvitationUncheckedCreateNestedManyWithoutInvitedUserInput
  }

  export type UserCreateOrConnectWithoutOwnedGuildsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutOwnedGuildsInput, UserUncheckedCreateWithoutOwnedGuildsInput>
  }

  export type UserCreateWithoutMemberOfGuildsInput = {
    userId?: string
    email: string
    displayName?: string | null
    avatar?: string | null
    firebaseUid?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdGuilds?: GuildCreateNestedManyWithoutCreatedByInput
    ownedGuilds?: GuildCreateNestedManyWithoutCurrentOwnerInput
    follows?: FollowCreateNestedManyWithoutUserInput
    followedBy?: FollowCreateNestedManyWithoutFollowedUserInput
    feedActivities?: FeedActivityCreateNestedManyWithoutUserInput
    sentInvitations?: GuildInvitationCreateNestedManyWithoutInvitedByInput
    receivedInvitations?: GuildInvitationCreateNestedManyWithoutInvitedUserInput
  }

  export type UserUncheckedCreateWithoutMemberOfGuildsInput = {
    userId?: string
    email: string
    displayName?: string | null
    avatar?: string | null
    firebaseUid?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdGuilds?: GuildUncheckedCreateNestedManyWithoutCreatedByInput
    ownedGuilds?: GuildUncheckedCreateNestedManyWithoutCurrentOwnerInput
    follows?: FollowUncheckedCreateNestedManyWithoutUserInput
    followedBy?: FollowUncheckedCreateNestedManyWithoutFollowedUserInput
    feedActivities?: FeedActivityUncheckedCreateNestedManyWithoutUserInput
    sentInvitations?: GuildInvitationUncheckedCreateNestedManyWithoutInvitedByInput
    receivedInvitations?: GuildInvitationUncheckedCreateNestedManyWithoutInvitedUserInput
  }

  export type UserCreateOrConnectWithoutMemberOfGuildsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutMemberOfGuildsInput, UserUncheckedCreateWithoutMemberOfGuildsInput>
  }

  export type ActCreateWithoutGuildInput = {
    actId?: string
    name: string
    bio?: string | null
    avatar?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    calendarEvents?: CalendarEventCreateNestedManyWithoutActsInput
  }

  export type ActUncheckedCreateWithoutGuildInput = {
    actId?: string
    name: string
    bio?: string | null
    avatar?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    calendarEvents?: CalendarEventUncheckedCreateNestedManyWithoutActsInput
  }

  export type ActCreateOrConnectWithoutGuildInput = {
    where: ActWhereUniqueInput
    create: XOR<ActCreateWithoutGuildInput, ActUncheckedCreateWithoutGuildInput>
  }

  export type VenueCreateWithoutGuildInput = {
    venueId?: string
    name: string
    address?: string | null
    city?: string | null
    state?: string | null
    zipCode?: string | null
    avatar?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    calendarEvents?: CalendarEventCreateNestedManyWithoutVenueInput
  }

  export type VenueUncheckedCreateWithoutGuildInput = {
    venueId?: string
    name: string
    address?: string | null
    city?: string | null
    state?: string | null
    zipCode?: string | null
    avatar?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    calendarEvents?: CalendarEventUncheckedCreateNestedManyWithoutVenueInput
  }

  export type VenueCreateOrConnectWithoutGuildInput = {
    where: VenueWhereUniqueInput
    create: XOR<VenueCreateWithoutGuildInput, VenueUncheckedCreateWithoutGuildInput>
  }

  export type ClubCreateWithoutGuildInput = {
    clubId?: string
    name: string
    description?: string | null
    avatar?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ClubUncheckedCreateWithoutGuildInput = {
    clubId?: string
    name: string
    description?: string | null
    avatar?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ClubCreateOrConnectWithoutGuildInput = {
    where: ClubWhereUniqueInput
    create: XOR<ClubCreateWithoutGuildInput, ClubUncheckedCreateWithoutGuildInput>
  }

  export type FollowCreateWithoutGuildInput = {
    followId?: string
    entityType: $Enums.FollowEntityType
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutFollowsInput
    followedUser?: UserCreateNestedOneWithoutFollowedByInput
    tag?: TagCreateNestedOneWithoutFollowsInput
  }

  export type FollowUncheckedCreateWithoutGuildInput = {
    followId?: string
    userId: string
    entityType: $Enums.FollowEntityType
    followedUserId?: string | null
    tagId?: string | null
    createdAt?: Date | string
  }

  export type FollowCreateOrConnectWithoutGuildInput = {
    where: FollowWhereUniqueInput
    create: XOR<FollowCreateWithoutGuildInput, FollowUncheckedCreateWithoutGuildInput>
  }

  export type FollowCreateManyGuildInputEnvelope = {
    data: FollowCreateManyGuildInput | FollowCreateManyGuildInput[]
    skipDuplicates?: boolean
  }

  export type GuildInvitationCreateWithoutGuildInput = {
    invitationId?: string
    status?: $Enums.GuildInvitationStatus
    createdAt?: Date | string
    respondedAt?: Date | string | null
    invitedUser: UserCreateNestedOneWithoutReceivedInvitationsInput
    invitedBy?: UserCreateNestedOneWithoutSentInvitationsInput
  }

  export type GuildInvitationUncheckedCreateWithoutGuildInput = {
    invitationId?: string
    invitedUserId: string
    invitedById?: string | null
    status?: $Enums.GuildInvitationStatus
    createdAt?: Date | string
    respondedAt?: Date | string | null
  }

  export type GuildInvitationCreateOrConnectWithoutGuildInput = {
    where: GuildInvitationWhereUniqueInput
    create: XOR<GuildInvitationCreateWithoutGuildInput, GuildInvitationUncheckedCreateWithoutGuildInput>
  }

  export type GuildInvitationCreateManyGuildInputEnvelope = {
    data: GuildInvitationCreateManyGuildInput | GuildInvitationCreateManyGuildInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutCreatedGuildsInput = {
    update: XOR<UserUpdateWithoutCreatedGuildsInput, UserUncheckedUpdateWithoutCreatedGuildsInput>
    create: XOR<UserCreateWithoutCreatedGuildsInput, UserUncheckedCreateWithoutCreatedGuildsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCreatedGuildsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCreatedGuildsInput, UserUncheckedUpdateWithoutCreatedGuildsInput>
  }

  export type UserUpdateWithoutCreatedGuildsInput = {
    userId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    firebaseUid?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ownedGuilds?: GuildUpdateManyWithoutCurrentOwnerNestedInput
    memberOfGuilds?: GuildUpdateManyWithoutMembersNestedInput
    follows?: FollowUpdateManyWithoutUserNestedInput
    followedBy?: FollowUpdateManyWithoutFollowedUserNestedInput
    feedActivities?: FeedActivityUpdateManyWithoutUserNestedInput
    sentInvitations?: GuildInvitationUpdateManyWithoutInvitedByNestedInput
    receivedInvitations?: GuildInvitationUpdateManyWithoutInvitedUserNestedInput
  }

  export type UserUncheckedUpdateWithoutCreatedGuildsInput = {
    userId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    firebaseUid?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ownedGuilds?: GuildUncheckedUpdateManyWithoutCurrentOwnerNestedInput
    memberOfGuilds?: GuildUncheckedUpdateManyWithoutMembersNestedInput
    follows?: FollowUncheckedUpdateManyWithoutUserNestedInput
    followedBy?: FollowUncheckedUpdateManyWithoutFollowedUserNestedInput
    feedActivities?: FeedActivityUncheckedUpdateManyWithoutUserNestedInput
    sentInvitations?: GuildInvitationUncheckedUpdateManyWithoutInvitedByNestedInput
    receivedInvitations?: GuildInvitationUncheckedUpdateManyWithoutInvitedUserNestedInput
  }

  export type UserUpsertWithoutOwnedGuildsInput = {
    update: XOR<UserUpdateWithoutOwnedGuildsInput, UserUncheckedUpdateWithoutOwnedGuildsInput>
    create: XOR<UserCreateWithoutOwnedGuildsInput, UserUncheckedCreateWithoutOwnedGuildsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutOwnedGuildsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutOwnedGuildsInput, UserUncheckedUpdateWithoutOwnedGuildsInput>
  }

  export type UserUpdateWithoutOwnedGuildsInput = {
    userId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    firebaseUid?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdGuilds?: GuildUpdateManyWithoutCreatedByNestedInput
    memberOfGuilds?: GuildUpdateManyWithoutMembersNestedInput
    follows?: FollowUpdateManyWithoutUserNestedInput
    followedBy?: FollowUpdateManyWithoutFollowedUserNestedInput
    feedActivities?: FeedActivityUpdateManyWithoutUserNestedInput
    sentInvitations?: GuildInvitationUpdateManyWithoutInvitedByNestedInput
    receivedInvitations?: GuildInvitationUpdateManyWithoutInvitedUserNestedInput
  }

  export type UserUncheckedUpdateWithoutOwnedGuildsInput = {
    userId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    firebaseUid?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdGuilds?: GuildUncheckedUpdateManyWithoutCreatedByNestedInput
    memberOfGuilds?: GuildUncheckedUpdateManyWithoutMembersNestedInput
    follows?: FollowUncheckedUpdateManyWithoutUserNestedInput
    followedBy?: FollowUncheckedUpdateManyWithoutFollowedUserNestedInput
    feedActivities?: FeedActivityUncheckedUpdateManyWithoutUserNestedInput
    sentInvitations?: GuildInvitationUncheckedUpdateManyWithoutInvitedByNestedInput
    receivedInvitations?: GuildInvitationUncheckedUpdateManyWithoutInvitedUserNestedInput
  }

  export type UserUpsertWithWhereUniqueWithoutMemberOfGuildsInput = {
    where: UserWhereUniqueInput
    update: XOR<UserUpdateWithoutMemberOfGuildsInput, UserUncheckedUpdateWithoutMemberOfGuildsInput>
    create: XOR<UserCreateWithoutMemberOfGuildsInput, UserUncheckedCreateWithoutMemberOfGuildsInput>
  }

  export type UserUpdateWithWhereUniqueWithoutMemberOfGuildsInput = {
    where: UserWhereUniqueInput
    data: XOR<UserUpdateWithoutMemberOfGuildsInput, UserUncheckedUpdateWithoutMemberOfGuildsInput>
  }

  export type UserUpdateManyWithWhereWithoutMemberOfGuildsInput = {
    where: UserScalarWhereInput
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyWithoutMemberOfGuildsInput>
  }

  export type UserScalarWhereInput = {
    AND?: UserScalarWhereInput | UserScalarWhereInput[]
    OR?: UserScalarWhereInput[]
    NOT?: UserScalarWhereInput | UserScalarWhereInput[]
    userId?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    displayName?: StringNullableFilter<"User"> | string | null
    avatar?: StringNullableFilter<"User"> | string | null
    firebaseUid?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
  }

  export type ActUpsertWithoutGuildInput = {
    update: XOR<ActUpdateWithoutGuildInput, ActUncheckedUpdateWithoutGuildInput>
    create: XOR<ActCreateWithoutGuildInput, ActUncheckedCreateWithoutGuildInput>
    where?: ActWhereInput
  }

  export type ActUpdateToOneWithWhereWithoutGuildInput = {
    where?: ActWhereInput
    data: XOR<ActUpdateWithoutGuildInput, ActUncheckedUpdateWithoutGuildInput>
  }

  export type ActUpdateWithoutGuildInput = {
    actId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    calendarEvents?: CalendarEventUpdateManyWithoutActsNestedInput
  }

  export type ActUncheckedUpdateWithoutGuildInput = {
    actId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    calendarEvents?: CalendarEventUncheckedUpdateManyWithoutActsNestedInput
  }

  export type VenueUpsertWithoutGuildInput = {
    update: XOR<VenueUpdateWithoutGuildInput, VenueUncheckedUpdateWithoutGuildInput>
    create: XOR<VenueCreateWithoutGuildInput, VenueUncheckedCreateWithoutGuildInput>
    where?: VenueWhereInput
  }

  export type VenueUpdateToOneWithWhereWithoutGuildInput = {
    where?: VenueWhereInput
    data: XOR<VenueUpdateWithoutGuildInput, VenueUncheckedUpdateWithoutGuildInput>
  }

  export type VenueUpdateWithoutGuildInput = {
    venueId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    zipCode?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    calendarEvents?: CalendarEventUpdateManyWithoutVenueNestedInput
  }

  export type VenueUncheckedUpdateWithoutGuildInput = {
    venueId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    zipCode?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    calendarEvents?: CalendarEventUncheckedUpdateManyWithoutVenueNestedInput
  }

  export type ClubUpsertWithoutGuildInput = {
    update: XOR<ClubUpdateWithoutGuildInput, ClubUncheckedUpdateWithoutGuildInput>
    create: XOR<ClubCreateWithoutGuildInput, ClubUncheckedCreateWithoutGuildInput>
    where?: ClubWhereInput
  }

  export type ClubUpdateToOneWithWhereWithoutGuildInput = {
    where?: ClubWhereInput
    data: XOR<ClubUpdateWithoutGuildInput, ClubUncheckedUpdateWithoutGuildInput>
  }

  export type ClubUpdateWithoutGuildInput = {
    clubId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClubUncheckedUpdateWithoutGuildInput = {
    clubId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FollowUpsertWithWhereUniqueWithoutGuildInput = {
    where: FollowWhereUniqueInput
    update: XOR<FollowUpdateWithoutGuildInput, FollowUncheckedUpdateWithoutGuildInput>
    create: XOR<FollowCreateWithoutGuildInput, FollowUncheckedCreateWithoutGuildInput>
  }

  export type FollowUpdateWithWhereUniqueWithoutGuildInput = {
    where: FollowWhereUniqueInput
    data: XOR<FollowUpdateWithoutGuildInput, FollowUncheckedUpdateWithoutGuildInput>
  }

  export type FollowUpdateManyWithWhereWithoutGuildInput = {
    where: FollowScalarWhereInput
    data: XOR<FollowUpdateManyMutationInput, FollowUncheckedUpdateManyWithoutGuildInput>
  }

  export type GuildInvitationUpsertWithWhereUniqueWithoutGuildInput = {
    where: GuildInvitationWhereUniqueInput
    update: XOR<GuildInvitationUpdateWithoutGuildInput, GuildInvitationUncheckedUpdateWithoutGuildInput>
    create: XOR<GuildInvitationCreateWithoutGuildInput, GuildInvitationUncheckedCreateWithoutGuildInput>
  }

  export type GuildInvitationUpdateWithWhereUniqueWithoutGuildInput = {
    where: GuildInvitationWhereUniqueInput
    data: XOR<GuildInvitationUpdateWithoutGuildInput, GuildInvitationUncheckedUpdateWithoutGuildInput>
  }

  export type GuildInvitationUpdateManyWithWhereWithoutGuildInput = {
    where: GuildInvitationScalarWhereInput
    data: XOR<GuildInvitationUpdateManyMutationInput, GuildInvitationUncheckedUpdateManyWithoutGuildInput>
  }

  export type GuildCreateWithoutActInput = {
    guildId?: string
    name: string
    guildType: $Enums.GuildType
    createdAt?: Date | string
    createdBy?: UserCreateNestedOneWithoutCreatedGuildsInput
    currentOwner: UserCreateNestedOneWithoutOwnedGuildsInput
    members?: UserCreateNestedManyWithoutMemberOfGuildsInput
    venue?: VenueCreateNestedOneWithoutGuildInput
    club?: ClubCreateNestedOneWithoutGuildInput
    follows?: FollowCreateNestedManyWithoutGuildInput
    invitations?: GuildInvitationCreateNestedManyWithoutGuildInput
  }

  export type GuildUncheckedCreateWithoutActInput = {
    guildId?: string
    name: string
    guildType: $Enums.GuildType
    createdAt?: Date | string
    createdById?: string | null
    currentOwnerId: string
    venueId?: string | null
    clubId?: string | null
    members?: UserUncheckedCreateNestedManyWithoutMemberOfGuildsInput
    follows?: FollowUncheckedCreateNestedManyWithoutGuildInput
    invitations?: GuildInvitationUncheckedCreateNestedManyWithoutGuildInput
  }

  export type GuildCreateOrConnectWithoutActInput = {
    where: GuildWhereUniqueInput
    create: XOR<GuildCreateWithoutActInput, GuildUncheckedCreateWithoutActInput>
  }

  export type CalendarEventCreateWithoutActsInput = {
    eventId?: string
    title?: string | null
    description?: string | null
    poster?: string | null
    startTime: Date | string
    duration: number
    createdAt?: Date | string
    updatedAt?: Date | string
    venue: VenueCreateNestedOneWithoutCalendarEventsInput
    feedActivities?: FeedActivityCreateNestedManyWithoutCalendarEventInput
  }

  export type CalendarEventUncheckedCreateWithoutActsInput = {
    eventId?: string
    title?: string | null
    description?: string | null
    poster?: string | null
    startTime: Date | string
    duration: number
    createdAt?: Date | string
    updatedAt?: Date | string
    venueId: string
    feedActivities?: FeedActivityUncheckedCreateNestedManyWithoutCalendarEventInput
  }

  export type CalendarEventCreateOrConnectWithoutActsInput = {
    where: CalendarEventWhereUniqueInput
    create: XOR<CalendarEventCreateWithoutActsInput, CalendarEventUncheckedCreateWithoutActsInput>
  }

  export type GuildUpsertWithoutActInput = {
    update: XOR<GuildUpdateWithoutActInput, GuildUncheckedUpdateWithoutActInput>
    create: XOR<GuildCreateWithoutActInput, GuildUncheckedCreateWithoutActInput>
    where?: GuildWhereInput
  }

  export type GuildUpdateToOneWithWhereWithoutActInput = {
    where?: GuildWhereInput
    data: XOR<GuildUpdateWithoutActInput, GuildUncheckedUpdateWithoutActInput>
  }

  export type GuildUpdateWithoutActInput = {
    guildId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    guildType?: EnumGuildTypeFieldUpdateOperationsInput | $Enums.GuildType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: UserUpdateOneWithoutCreatedGuildsNestedInput
    currentOwner?: UserUpdateOneRequiredWithoutOwnedGuildsNestedInput
    members?: UserUpdateManyWithoutMemberOfGuildsNestedInput
    venue?: VenueUpdateOneWithoutGuildNestedInput
    club?: ClubUpdateOneWithoutGuildNestedInput
    follows?: FollowUpdateManyWithoutGuildNestedInput
    invitations?: GuildInvitationUpdateManyWithoutGuildNestedInput
  }

  export type GuildUncheckedUpdateWithoutActInput = {
    guildId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    guildType?: EnumGuildTypeFieldUpdateOperationsInput | $Enums.GuildType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdById?: NullableStringFieldUpdateOperationsInput | string | null
    currentOwnerId?: StringFieldUpdateOperationsInput | string
    venueId?: NullableStringFieldUpdateOperationsInput | string | null
    clubId?: NullableStringFieldUpdateOperationsInput | string | null
    members?: UserUncheckedUpdateManyWithoutMemberOfGuildsNestedInput
    follows?: FollowUncheckedUpdateManyWithoutGuildNestedInput
    invitations?: GuildInvitationUncheckedUpdateManyWithoutGuildNestedInput
  }

  export type CalendarEventUpsertWithWhereUniqueWithoutActsInput = {
    where: CalendarEventWhereUniqueInput
    update: XOR<CalendarEventUpdateWithoutActsInput, CalendarEventUncheckedUpdateWithoutActsInput>
    create: XOR<CalendarEventCreateWithoutActsInput, CalendarEventUncheckedCreateWithoutActsInput>
  }

  export type CalendarEventUpdateWithWhereUniqueWithoutActsInput = {
    where: CalendarEventWhereUniqueInput
    data: XOR<CalendarEventUpdateWithoutActsInput, CalendarEventUncheckedUpdateWithoutActsInput>
  }

  export type CalendarEventUpdateManyWithWhereWithoutActsInput = {
    where: CalendarEventScalarWhereInput
    data: XOR<CalendarEventUpdateManyMutationInput, CalendarEventUncheckedUpdateManyWithoutActsInput>
  }

  export type CalendarEventScalarWhereInput = {
    AND?: CalendarEventScalarWhereInput | CalendarEventScalarWhereInput[]
    OR?: CalendarEventScalarWhereInput[]
    NOT?: CalendarEventScalarWhereInput | CalendarEventScalarWhereInput[]
    eventId?: StringFilter<"CalendarEvent"> | string
    title?: StringNullableFilter<"CalendarEvent"> | string | null
    description?: StringNullableFilter<"CalendarEvent"> | string | null
    poster?: StringNullableFilter<"CalendarEvent"> | string | null
    startTime?: DateTimeFilter<"CalendarEvent"> | Date | string
    duration?: IntFilter<"CalendarEvent"> | number
    createdAt?: DateTimeFilter<"CalendarEvent"> | Date | string
    updatedAt?: DateTimeFilter<"CalendarEvent"> | Date | string
    venueId?: StringFilter<"CalendarEvent"> | string
  }

  export type GuildCreateWithoutVenueInput = {
    guildId?: string
    name: string
    guildType: $Enums.GuildType
    createdAt?: Date | string
    createdBy?: UserCreateNestedOneWithoutCreatedGuildsInput
    currentOwner: UserCreateNestedOneWithoutOwnedGuildsInput
    members?: UserCreateNestedManyWithoutMemberOfGuildsInput
    act?: ActCreateNestedOneWithoutGuildInput
    club?: ClubCreateNestedOneWithoutGuildInput
    follows?: FollowCreateNestedManyWithoutGuildInput
    invitations?: GuildInvitationCreateNestedManyWithoutGuildInput
  }

  export type GuildUncheckedCreateWithoutVenueInput = {
    guildId?: string
    name: string
    guildType: $Enums.GuildType
    createdAt?: Date | string
    createdById?: string | null
    currentOwnerId: string
    actId?: string | null
    clubId?: string | null
    members?: UserUncheckedCreateNestedManyWithoutMemberOfGuildsInput
    follows?: FollowUncheckedCreateNestedManyWithoutGuildInput
    invitations?: GuildInvitationUncheckedCreateNestedManyWithoutGuildInput
  }

  export type GuildCreateOrConnectWithoutVenueInput = {
    where: GuildWhereUniqueInput
    create: XOR<GuildCreateWithoutVenueInput, GuildUncheckedCreateWithoutVenueInput>
  }

  export type CalendarEventCreateWithoutVenueInput = {
    eventId?: string
    title?: string | null
    description?: string | null
    poster?: string | null
    startTime: Date | string
    duration: number
    createdAt?: Date | string
    updatedAt?: Date | string
    acts?: ActCreateNestedManyWithoutCalendarEventsInput
    feedActivities?: FeedActivityCreateNestedManyWithoutCalendarEventInput
  }

  export type CalendarEventUncheckedCreateWithoutVenueInput = {
    eventId?: string
    title?: string | null
    description?: string | null
    poster?: string | null
    startTime: Date | string
    duration: number
    createdAt?: Date | string
    updatedAt?: Date | string
    acts?: ActUncheckedCreateNestedManyWithoutCalendarEventsInput
    feedActivities?: FeedActivityUncheckedCreateNestedManyWithoutCalendarEventInput
  }

  export type CalendarEventCreateOrConnectWithoutVenueInput = {
    where: CalendarEventWhereUniqueInput
    create: XOR<CalendarEventCreateWithoutVenueInput, CalendarEventUncheckedCreateWithoutVenueInput>
  }

  export type CalendarEventCreateManyVenueInputEnvelope = {
    data: CalendarEventCreateManyVenueInput | CalendarEventCreateManyVenueInput[]
    skipDuplicates?: boolean
  }

  export type GuildUpsertWithoutVenueInput = {
    update: XOR<GuildUpdateWithoutVenueInput, GuildUncheckedUpdateWithoutVenueInput>
    create: XOR<GuildCreateWithoutVenueInput, GuildUncheckedCreateWithoutVenueInput>
    where?: GuildWhereInput
  }

  export type GuildUpdateToOneWithWhereWithoutVenueInput = {
    where?: GuildWhereInput
    data: XOR<GuildUpdateWithoutVenueInput, GuildUncheckedUpdateWithoutVenueInput>
  }

  export type GuildUpdateWithoutVenueInput = {
    guildId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    guildType?: EnumGuildTypeFieldUpdateOperationsInput | $Enums.GuildType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: UserUpdateOneWithoutCreatedGuildsNestedInput
    currentOwner?: UserUpdateOneRequiredWithoutOwnedGuildsNestedInput
    members?: UserUpdateManyWithoutMemberOfGuildsNestedInput
    act?: ActUpdateOneWithoutGuildNestedInput
    club?: ClubUpdateOneWithoutGuildNestedInput
    follows?: FollowUpdateManyWithoutGuildNestedInput
    invitations?: GuildInvitationUpdateManyWithoutGuildNestedInput
  }

  export type GuildUncheckedUpdateWithoutVenueInput = {
    guildId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    guildType?: EnumGuildTypeFieldUpdateOperationsInput | $Enums.GuildType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdById?: NullableStringFieldUpdateOperationsInput | string | null
    currentOwnerId?: StringFieldUpdateOperationsInput | string
    actId?: NullableStringFieldUpdateOperationsInput | string | null
    clubId?: NullableStringFieldUpdateOperationsInput | string | null
    members?: UserUncheckedUpdateManyWithoutMemberOfGuildsNestedInput
    follows?: FollowUncheckedUpdateManyWithoutGuildNestedInput
    invitations?: GuildInvitationUncheckedUpdateManyWithoutGuildNestedInput
  }

  export type CalendarEventUpsertWithWhereUniqueWithoutVenueInput = {
    where: CalendarEventWhereUniqueInput
    update: XOR<CalendarEventUpdateWithoutVenueInput, CalendarEventUncheckedUpdateWithoutVenueInput>
    create: XOR<CalendarEventCreateWithoutVenueInput, CalendarEventUncheckedCreateWithoutVenueInput>
  }

  export type CalendarEventUpdateWithWhereUniqueWithoutVenueInput = {
    where: CalendarEventWhereUniqueInput
    data: XOR<CalendarEventUpdateWithoutVenueInput, CalendarEventUncheckedUpdateWithoutVenueInput>
  }

  export type CalendarEventUpdateManyWithWhereWithoutVenueInput = {
    where: CalendarEventScalarWhereInput
    data: XOR<CalendarEventUpdateManyMutationInput, CalendarEventUncheckedUpdateManyWithoutVenueInput>
  }

  export type GuildCreateWithoutClubInput = {
    guildId?: string
    name: string
    guildType: $Enums.GuildType
    createdAt?: Date | string
    createdBy?: UserCreateNestedOneWithoutCreatedGuildsInput
    currentOwner: UserCreateNestedOneWithoutOwnedGuildsInput
    members?: UserCreateNestedManyWithoutMemberOfGuildsInput
    act?: ActCreateNestedOneWithoutGuildInput
    venue?: VenueCreateNestedOneWithoutGuildInput
    follows?: FollowCreateNestedManyWithoutGuildInput
    invitations?: GuildInvitationCreateNestedManyWithoutGuildInput
  }

  export type GuildUncheckedCreateWithoutClubInput = {
    guildId?: string
    name: string
    guildType: $Enums.GuildType
    createdAt?: Date | string
    createdById?: string | null
    currentOwnerId: string
    actId?: string | null
    venueId?: string | null
    members?: UserUncheckedCreateNestedManyWithoutMemberOfGuildsInput
    follows?: FollowUncheckedCreateNestedManyWithoutGuildInput
    invitations?: GuildInvitationUncheckedCreateNestedManyWithoutGuildInput
  }

  export type GuildCreateOrConnectWithoutClubInput = {
    where: GuildWhereUniqueInput
    create: XOR<GuildCreateWithoutClubInput, GuildUncheckedCreateWithoutClubInput>
  }

  export type GuildUpsertWithoutClubInput = {
    update: XOR<GuildUpdateWithoutClubInput, GuildUncheckedUpdateWithoutClubInput>
    create: XOR<GuildCreateWithoutClubInput, GuildUncheckedCreateWithoutClubInput>
    where?: GuildWhereInput
  }

  export type GuildUpdateToOneWithWhereWithoutClubInput = {
    where?: GuildWhereInput
    data: XOR<GuildUpdateWithoutClubInput, GuildUncheckedUpdateWithoutClubInput>
  }

  export type GuildUpdateWithoutClubInput = {
    guildId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    guildType?: EnumGuildTypeFieldUpdateOperationsInput | $Enums.GuildType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: UserUpdateOneWithoutCreatedGuildsNestedInput
    currentOwner?: UserUpdateOneRequiredWithoutOwnedGuildsNestedInput
    members?: UserUpdateManyWithoutMemberOfGuildsNestedInput
    act?: ActUpdateOneWithoutGuildNestedInput
    venue?: VenueUpdateOneWithoutGuildNestedInput
    follows?: FollowUpdateManyWithoutGuildNestedInput
    invitations?: GuildInvitationUpdateManyWithoutGuildNestedInput
  }

  export type GuildUncheckedUpdateWithoutClubInput = {
    guildId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    guildType?: EnumGuildTypeFieldUpdateOperationsInput | $Enums.GuildType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdById?: NullableStringFieldUpdateOperationsInput | string | null
    currentOwnerId?: StringFieldUpdateOperationsInput | string
    actId?: NullableStringFieldUpdateOperationsInput | string | null
    venueId?: NullableStringFieldUpdateOperationsInput | string | null
    members?: UserUncheckedUpdateManyWithoutMemberOfGuildsNestedInput
    follows?: FollowUncheckedUpdateManyWithoutGuildNestedInput
    invitations?: GuildInvitationUncheckedUpdateManyWithoutGuildNestedInput
  }

  export type VenueCreateWithoutCalendarEventsInput = {
    venueId?: string
    name: string
    address?: string | null
    city?: string | null
    state?: string | null
    zipCode?: string | null
    avatar?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    guild?: GuildCreateNestedOneWithoutVenueInput
  }

  export type VenueUncheckedCreateWithoutCalendarEventsInput = {
    venueId?: string
    name: string
    address?: string | null
    city?: string | null
    state?: string | null
    zipCode?: string | null
    avatar?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    guild?: GuildUncheckedCreateNestedOneWithoutVenueInput
  }

  export type VenueCreateOrConnectWithoutCalendarEventsInput = {
    where: VenueWhereUniqueInput
    create: XOR<VenueCreateWithoutCalendarEventsInput, VenueUncheckedCreateWithoutCalendarEventsInput>
  }

  export type ActCreateWithoutCalendarEventsInput = {
    actId?: string
    name: string
    bio?: string | null
    avatar?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    guild?: GuildCreateNestedOneWithoutActInput
  }

  export type ActUncheckedCreateWithoutCalendarEventsInput = {
    actId?: string
    name: string
    bio?: string | null
    avatar?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    guild?: GuildUncheckedCreateNestedOneWithoutActInput
  }

  export type ActCreateOrConnectWithoutCalendarEventsInput = {
    where: ActWhereUniqueInput
    create: XOR<ActCreateWithoutCalendarEventsInput, ActUncheckedCreateWithoutCalendarEventsInput>
  }

  export type FeedActivityCreateWithoutCalendarEventInput = {
    activityId?: string
    activityType: string
    createdAt?: Date | string
    subjectType: string
    subjectId: string
    user?: UserCreateNestedOneWithoutFeedActivitiesInput
  }

  export type FeedActivityUncheckedCreateWithoutCalendarEventInput = {
    activityId?: string
    activityType: string
    createdAt?: Date | string
    subjectType: string
    subjectId: string
    userId?: string | null
  }

  export type FeedActivityCreateOrConnectWithoutCalendarEventInput = {
    where: FeedActivityWhereUniqueInput
    create: XOR<FeedActivityCreateWithoutCalendarEventInput, FeedActivityUncheckedCreateWithoutCalendarEventInput>
  }

  export type FeedActivityCreateManyCalendarEventInputEnvelope = {
    data: FeedActivityCreateManyCalendarEventInput | FeedActivityCreateManyCalendarEventInput[]
    skipDuplicates?: boolean
  }

  export type VenueUpsertWithoutCalendarEventsInput = {
    update: XOR<VenueUpdateWithoutCalendarEventsInput, VenueUncheckedUpdateWithoutCalendarEventsInput>
    create: XOR<VenueCreateWithoutCalendarEventsInput, VenueUncheckedCreateWithoutCalendarEventsInput>
    where?: VenueWhereInput
  }

  export type VenueUpdateToOneWithWhereWithoutCalendarEventsInput = {
    where?: VenueWhereInput
    data: XOR<VenueUpdateWithoutCalendarEventsInput, VenueUncheckedUpdateWithoutCalendarEventsInput>
  }

  export type VenueUpdateWithoutCalendarEventsInput = {
    venueId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    zipCode?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    guild?: GuildUpdateOneWithoutVenueNestedInput
  }

  export type VenueUncheckedUpdateWithoutCalendarEventsInput = {
    venueId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    zipCode?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    guild?: GuildUncheckedUpdateOneWithoutVenueNestedInput
  }

  export type ActUpsertWithWhereUniqueWithoutCalendarEventsInput = {
    where: ActWhereUniqueInput
    update: XOR<ActUpdateWithoutCalendarEventsInput, ActUncheckedUpdateWithoutCalendarEventsInput>
    create: XOR<ActCreateWithoutCalendarEventsInput, ActUncheckedCreateWithoutCalendarEventsInput>
  }

  export type ActUpdateWithWhereUniqueWithoutCalendarEventsInput = {
    where: ActWhereUniqueInput
    data: XOR<ActUpdateWithoutCalendarEventsInput, ActUncheckedUpdateWithoutCalendarEventsInput>
  }

  export type ActUpdateManyWithWhereWithoutCalendarEventsInput = {
    where: ActScalarWhereInput
    data: XOR<ActUpdateManyMutationInput, ActUncheckedUpdateManyWithoutCalendarEventsInput>
  }

  export type ActScalarWhereInput = {
    AND?: ActScalarWhereInput | ActScalarWhereInput[]
    OR?: ActScalarWhereInput[]
    NOT?: ActScalarWhereInput | ActScalarWhereInput[]
    actId?: StringFilter<"Act"> | string
    name?: StringFilter<"Act"> | string
    bio?: StringNullableFilter<"Act"> | string | null
    avatar?: StringNullableFilter<"Act"> | string | null
    createdAt?: DateTimeFilter<"Act"> | Date | string
    updatedAt?: DateTimeFilter<"Act"> | Date | string
  }

  export type FeedActivityUpsertWithWhereUniqueWithoutCalendarEventInput = {
    where: FeedActivityWhereUniqueInput
    update: XOR<FeedActivityUpdateWithoutCalendarEventInput, FeedActivityUncheckedUpdateWithoutCalendarEventInput>
    create: XOR<FeedActivityCreateWithoutCalendarEventInput, FeedActivityUncheckedCreateWithoutCalendarEventInput>
  }

  export type FeedActivityUpdateWithWhereUniqueWithoutCalendarEventInput = {
    where: FeedActivityWhereUniqueInput
    data: XOR<FeedActivityUpdateWithoutCalendarEventInput, FeedActivityUncheckedUpdateWithoutCalendarEventInput>
  }

  export type FeedActivityUpdateManyWithWhereWithoutCalendarEventInput = {
    where: FeedActivityScalarWhereInput
    data: XOR<FeedActivityUpdateManyMutationInput, FeedActivityUncheckedUpdateManyWithoutCalendarEventInput>
  }

  export type CalendarEventCreateWithoutFeedActivitiesInput = {
    eventId?: string
    title?: string | null
    description?: string | null
    poster?: string | null
    startTime: Date | string
    duration: number
    createdAt?: Date | string
    updatedAt?: Date | string
    venue: VenueCreateNestedOneWithoutCalendarEventsInput
    acts?: ActCreateNestedManyWithoutCalendarEventsInput
  }

  export type CalendarEventUncheckedCreateWithoutFeedActivitiesInput = {
    eventId?: string
    title?: string | null
    description?: string | null
    poster?: string | null
    startTime: Date | string
    duration: number
    createdAt?: Date | string
    updatedAt?: Date | string
    venueId: string
    acts?: ActUncheckedCreateNestedManyWithoutCalendarEventsInput
  }

  export type CalendarEventCreateOrConnectWithoutFeedActivitiesInput = {
    where: CalendarEventWhereUniqueInput
    create: XOR<CalendarEventCreateWithoutFeedActivitiesInput, CalendarEventUncheckedCreateWithoutFeedActivitiesInput>
  }

  export type UserCreateWithoutFeedActivitiesInput = {
    userId?: string
    email: string
    displayName?: string | null
    avatar?: string | null
    firebaseUid?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdGuilds?: GuildCreateNestedManyWithoutCreatedByInput
    ownedGuilds?: GuildCreateNestedManyWithoutCurrentOwnerInput
    memberOfGuilds?: GuildCreateNestedManyWithoutMembersInput
    follows?: FollowCreateNestedManyWithoutUserInput
    followedBy?: FollowCreateNestedManyWithoutFollowedUserInput
    sentInvitations?: GuildInvitationCreateNestedManyWithoutInvitedByInput
    receivedInvitations?: GuildInvitationCreateNestedManyWithoutInvitedUserInput
  }

  export type UserUncheckedCreateWithoutFeedActivitiesInput = {
    userId?: string
    email: string
    displayName?: string | null
    avatar?: string | null
    firebaseUid?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdGuilds?: GuildUncheckedCreateNestedManyWithoutCreatedByInput
    ownedGuilds?: GuildUncheckedCreateNestedManyWithoutCurrentOwnerInput
    memberOfGuilds?: GuildUncheckedCreateNestedManyWithoutMembersInput
    follows?: FollowUncheckedCreateNestedManyWithoutUserInput
    followedBy?: FollowUncheckedCreateNestedManyWithoutFollowedUserInput
    sentInvitations?: GuildInvitationUncheckedCreateNestedManyWithoutInvitedByInput
    receivedInvitations?: GuildInvitationUncheckedCreateNestedManyWithoutInvitedUserInput
  }

  export type UserCreateOrConnectWithoutFeedActivitiesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutFeedActivitiesInput, UserUncheckedCreateWithoutFeedActivitiesInput>
  }

  export type CalendarEventUpsertWithoutFeedActivitiesInput = {
    update: XOR<CalendarEventUpdateWithoutFeedActivitiesInput, CalendarEventUncheckedUpdateWithoutFeedActivitiesInput>
    create: XOR<CalendarEventCreateWithoutFeedActivitiesInput, CalendarEventUncheckedCreateWithoutFeedActivitiesInput>
    where?: CalendarEventWhereInput
  }

  export type CalendarEventUpdateToOneWithWhereWithoutFeedActivitiesInput = {
    where?: CalendarEventWhereInput
    data: XOR<CalendarEventUpdateWithoutFeedActivitiesInput, CalendarEventUncheckedUpdateWithoutFeedActivitiesInput>
  }

  export type CalendarEventUpdateWithoutFeedActivitiesInput = {
    eventId?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    poster?: NullableStringFieldUpdateOperationsInput | string | null
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    duration?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    venue?: VenueUpdateOneRequiredWithoutCalendarEventsNestedInput
    acts?: ActUpdateManyWithoutCalendarEventsNestedInput
  }

  export type CalendarEventUncheckedUpdateWithoutFeedActivitiesInput = {
    eventId?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    poster?: NullableStringFieldUpdateOperationsInput | string | null
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    duration?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    venueId?: StringFieldUpdateOperationsInput | string
    acts?: ActUncheckedUpdateManyWithoutCalendarEventsNestedInput
  }

  export type UserUpsertWithoutFeedActivitiesInput = {
    update: XOR<UserUpdateWithoutFeedActivitiesInput, UserUncheckedUpdateWithoutFeedActivitiesInput>
    create: XOR<UserCreateWithoutFeedActivitiesInput, UserUncheckedCreateWithoutFeedActivitiesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutFeedActivitiesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutFeedActivitiesInput, UserUncheckedUpdateWithoutFeedActivitiesInput>
  }

  export type UserUpdateWithoutFeedActivitiesInput = {
    userId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    firebaseUid?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdGuilds?: GuildUpdateManyWithoutCreatedByNestedInput
    ownedGuilds?: GuildUpdateManyWithoutCurrentOwnerNestedInput
    memberOfGuilds?: GuildUpdateManyWithoutMembersNestedInput
    follows?: FollowUpdateManyWithoutUserNestedInput
    followedBy?: FollowUpdateManyWithoutFollowedUserNestedInput
    sentInvitations?: GuildInvitationUpdateManyWithoutInvitedByNestedInput
    receivedInvitations?: GuildInvitationUpdateManyWithoutInvitedUserNestedInput
  }

  export type UserUncheckedUpdateWithoutFeedActivitiesInput = {
    userId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    firebaseUid?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdGuilds?: GuildUncheckedUpdateManyWithoutCreatedByNestedInput
    ownedGuilds?: GuildUncheckedUpdateManyWithoutCurrentOwnerNestedInput
    memberOfGuilds?: GuildUncheckedUpdateManyWithoutMembersNestedInput
    follows?: FollowUncheckedUpdateManyWithoutUserNestedInput
    followedBy?: FollowUncheckedUpdateManyWithoutFollowedUserNestedInput
    sentInvitations?: GuildInvitationUncheckedUpdateManyWithoutInvitedByNestedInput
    receivedInvitations?: GuildInvitationUncheckedUpdateManyWithoutInvitedUserNestedInput
  }

  export type GuildCreateWithoutInvitationsInput = {
    guildId?: string
    name: string
    guildType: $Enums.GuildType
    createdAt?: Date | string
    createdBy?: UserCreateNestedOneWithoutCreatedGuildsInput
    currentOwner: UserCreateNestedOneWithoutOwnedGuildsInput
    members?: UserCreateNestedManyWithoutMemberOfGuildsInput
    act?: ActCreateNestedOneWithoutGuildInput
    venue?: VenueCreateNestedOneWithoutGuildInput
    club?: ClubCreateNestedOneWithoutGuildInput
    follows?: FollowCreateNestedManyWithoutGuildInput
  }

  export type GuildUncheckedCreateWithoutInvitationsInput = {
    guildId?: string
    name: string
    guildType: $Enums.GuildType
    createdAt?: Date | string
    createdById?: string | null
    currentOwnerId: string
    actId?: string | null
    venueId?: string | null
    clubId?: string | null
    members?: UserUncheckedCreateNestedManyWithoutMemberOfGuildsInput
    follows?: FollowUncheckedCreateNestedManyWithoutGuildInput
  }

  export type GuildCreateOrConnectWithoutInvitationsInput = {
    where: GuildWhereUniqueInput
    create: XOR<GuildCreateWithoutInvitationsInput, GuildUncheckedCreateWithoutInvitationsInput>
  }

  export type UserCreateWithoutReceivedInvitationsInput = {
    userId?: string
    email: string
    displayName?: string | null
    avatar?: string | null
    firebaseUid?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdGuilds?: GuildCreateNestedManyWithoutCreatedByInput
    ownedGuilds?: GuildCreateNestedManyWithoutCurrentOwnerInput
    memberOfGuilds?: GuildCreateNestedManyWithoutMembersInput
    follows?: FollowCreateNestedManyWithoutUserInput
    followedBy?: FollowCreateNestedManyWithoutFollowedUserInput
    feedActivities?: FeedActivityCreateNestedManyWithoutUserInput
    sentInvitations?: GuildInvitationCreateNestedManyWithoutInvitedByInput
  }

  export type UserUncheckedCreateWithoutReceivedInvitationsInput = {
    userId?: string
    email: string
    displayName?: string | null
    avatar?: string | null
    firebaseUid?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdGuilds?: GuildUncheckedCreateNestedManyWithoutCreatedByInput
    ownedGuilds?: GuildUncheckedCreateNestedManyWithoutCurrentOwnerInput
    memberOfGuilds?: GuildUncheckedCreateNestedManyWithoutMembersInput
    follows?: FollowUncheckedCreateNestedManyWithoutUserInput
    followedBy?: FollowUncheckedCreateNestedManyWithoutFollowedUserInput
    feedActivities?: FeedActivityUncheckedCreateNestedManyWithoutUserInput
    sentInvitations?: GuildInvitationUncheckedCreateNestedManyWithoutInvitedByInput
  }

  export type UserCreateOrConnectWithoutReceivedInvitationsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutReceivedInvitationsInput, UserUncheckedCreateWithoutReceivedInvitationsInput>
  }

  export type UserCreateWithoutSentInvitationsInput = {
    userId?: string
    email: string
    displayName?: string | null
    avatar?: string | null
    firebaseUid?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdGuilds?: GuildCreateNestedManyWithoutCreatedByInput
    ownedGuilds?: GuildCreateNestedManyWithoutCurrentOwnerInput
    memberOfGuilds?: GuildCreateNestedManyWithoutMembersInput
    follows?: FollowCreateNestedManyWithoutUserInput
    followedBy?: FollowCreateNestedManyWithoutFollowedUserInput
    feedActivities?: FeedActivityCreateNestedManyWithoutUserInput
    receivedInvitations?: GuildInvitationCreateNestedManyWithoutInvitedUserInput
  }

  export type UserUncheckedCreateWithoutSentInvitationsInput = {
    userId?: string
    email: string
    displayName?: string | null
    avatar?: string | null
    firebaseUid?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    createdGuilds?: GuildUncheckedCreateNestedManyWithoutCreatedByInput
    ownedGuilds?: GuildUncheckedCreateNestedManyWithoutCurrentOwnerInput
    memberOfGuilds?: GuildUncheckedCreateNestedManyWithoutMembersInput
    follows?: FollowUncheckedCreateNestedManyWithoutUserInput
    followedBy?: FollowUncheckedCreateNestedManyWithoutFollowedUserInput
    feedActivities?: FeedActivityUncheckedCreateNestedManyWithoutUserInput
    receivedInvitations?: GuildInvitationUncheckedCreateNestedManyWithoutInvitedUserInput
  }

  export type UserCreateOrConnectWithoutSentInvitationsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSentInvitationsInput, UserUncheckedCreateWithoutSentInvitationsInput>
  }

  export type GuildUpsertWithoutInvitationsInput = {
    update: XOR<GuildUpdateWithoutInvitationsInput, GuildUncheckedUpdateWithoutInvitationsInput>
    create: XOR<GuildCreateWithoutInvitationsInput, GuildUncheckedCreateWithoutInvitationsInput>
    where?: GuildWhereInput
  }

  export type GuildUpdateToOneWithWhereWithoutInvitationsInput = {
    where?: GuildWhereInput
    data: XOR<GuildUpdateWithoutInvitationsInput, GuildUncheckedUpdateWithoutInvitationsInput>
  }

  export type GuildUpdateWithoutInvitationsInput = {
    guildId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    guildType?: EnumGuildTypeFieldUpdateOperationsInput | $Enums.GuildType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: UserUpdateOneWithoutCreatedGuildsNestedInput
    currentOwner?: UserUpdateOneRequiredWithoutOwnedGuildsNestedInput
    members?: UserUpdateManyWithoutMemberOfGuildsNestedInput
    act?: ActUpdateOneWithoutGuildNestedInput
    venue?: VenueUpdateOneWithoutGuildNestedInput
    club?: ClubUpdateOneWithoutGuildNestedInput
    follows?: FollowUpdateManyWithoutGuildNestedInput
  }

  export type GuildUncheckedUpdateWithoutInvitationsInput = {
    guildId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    guildType?: EnumGuildTypeFieldUpdateOperationsInput | $Enums.GuildType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdById?: NullableStringFieldUpdateOperationsInput | string | null
    currentOwnerId?: StringFieldUpdateOperationsInput | string
    actId?: NullableStringFieldUpdateOperationsInput | string | null
    venueId?: NullableStringFieldUpdateOperationsInput | string | null
    clubId?: NullableStringFieldUpdateOperationsInput | string | null
    members?: UserUncheckedUpdateManyWithoutMemberOfGuildsNestedInput
    follows?: FollowUncheckedUpdateManyWithoutGuildNestedInput
  }

  export type UserUpsertWithoutReceivedInvitationsInput = {
    update: XOR<UserUpdateWithoutReceivedInvitationsInput, UserUncheckedUpdateWithoutReceivedInvitationsInput>
    create: XOR<UserCreateWithoutReceivedInvitationsInput, UserUncheckedCreateWithoutReceivedInvitationsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutReceivedInvitationsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutReceivedInvitationsInput, UserUncheckedUpdateWithoutReceivedInvitationsInput>
  }

  export type UserUpdateWithoutReceivedInvitationsInput = {
    userId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    firebaseUid?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdGuilds?: GuildUpdateManyWithoutCreatedByNestedInput
    ownedGuilds?: GuildUpdateManyWithoutCurrentOwnerNestedInput
    memberOfGuilds?: GuildUpdateManyWithoutMembersNestedInput
    follows?: FollowUpdateManyWithoutUserNestedInput
    followedBy?: FollowUpdateManyWithoutFollowedUserNestedInput
    feedActivities?: FeedActivityUpdateManyWithoutUserNestedInput
    sentInvitations?: GuildInvitationUpdateManyWithoutInvitedByNestedInput
  }

  export type UserUncheckedUpdateWithoutReceivedInvitationsInput = {
    userId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    firebaseUid?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdGuilds?: GuildUncheckedUpdateManyWithoutCreatedByNestedInput
    ownedGuilds?: GuildUncheckedUpdateManyWithoutCurrentOwnerNestedInput
    memberOfGuilds?: GuildUncheckedUpdateManyWithoutMembersNestedInput
    follows?: FollowUncheckedUpdateManyWithoutUserNestedInput
    followedBy?: FollowUncheckedUpdateManyWithoutFollowedUserNestedInput
    feedActivities?: FeedActivityUncheckedUpdateManyWithoutUserNestedInput
    sentInvitations?: GuildInvitationUncheckedUpdateManyWithoutInvitedByNestedInput
  }

  export type UserUpsertWithoutSentInvitationsInput = {
    update: XOR<UserUpdateWithoutSentInvitationsInput, UserUncheckedUpdateWithoutSentInvitationsInput>
    create: XOR<UserCreateWithoutSentInvitationsInput, UserUncheckedCreateWithoutSentInvitationsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSentInvitationsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSentInvitationsInput, UserUncheckedUpdateWithoutSentInvitationsInput>
  }

  export type UserUpdateWithoutSentInvitationsInput = {
    userId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    firebaseUid?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdGuilds?: GuildUpdateManyWithoutCreatedByNestedInput
    ownedGuilds?: GuildUpdateManyWithoutCurrentOwnerNestedInput
    memberOfGuilds?: GuildUpdateManyWithoutMembersNestedInput
    follows?: FollowUpdateManyWithoutUserNestedInput
    followedBy?: FollowUpdateManyWithoutFollowedUserNestedInput
    feedActivities?: FeedActivityUpdateManyWithoutUserNestedInput
    receivedInvitations?: GuildInvitationUpdateManyWithoutInvitedUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSentInvitationsInput = {
    userId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    firebaseUid?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdGuilds?: GuildUncheckedUpdateManyWithoutCreatedByNestedInput
    ownedGuilds?: GuildUncheckedUpdateManyWithoutCurrentOwnerNestedInput
    memberOfGuilds?: GuildUncheckedUpdateManyWithoutMembersNestedInput
    follows?: FollowUncheckedUpdateManyWithoutUserNestedInput
    followedBy?: FollowUncheckedUpdateManyWithoutFollowedUserNestedInput
    feedActivities?: FeedActivityUncheckedUpdateManyWithoutUserNestedInput
    receivedInvitations?: GuildInvitationUncheckedUpdateManyWithoutInvitedUserNestedInput
  }

  export type GuildCreateManyCreatedByInput = {
    guildId?: string
    name: string
    guildType: $Enums.GuildType
    createdAt?: Date | string
    currentOwnerId: string
    actId?: string | null
    venueId?: string | null
    clubId?: string | null
  }

  export type GuildCreateManyCurrentOwnerInput = {
    guildId?: string
    name: string
    guildType: $Enums.GuildType
    createdAt?: Date | string
    createdById?: string | null
    actId?: string | null
    venueId?: string | null
    clubId?: string | null
  }

  export type FollowCreateManyUserInput = {
    followId?: string
    entityType: $Enums.FollowEntityType
    followedUserId?: string | null
    tagId?: string | null
    guildId?: string | null
    createdAt?: Date | string
  }

  export type FollowCreateManyFollowedUserInput = {
    followId?: string
    userId: string
    entityType: $Enums.FollowEntityType
    tagId?: string | null
    guildId?: string | null
    createdAt?: Date | string
  }

  export type FeedActivityCreateManyUserInput = {
    activityId?: string
    activityType: string
    createdAt?: Date | string
    subjectType: string
    subjectId: string
    calendarEventId?: string | null
  }

  export type GuildInvitationCreateManyInvitedByInput = {
    invitationId?: string
    guildId: string
    invitedUserId: string
    status?: $Enums.GuildInvitationStatus
    createdAt?: Date | string
    respondedAt?: Date | string | null
  }

  export type GuildInvitationCreateManyInvitedUserInput = {
    invitationId?: string
    guildId: string
    invitedById?: string | null
    status?: $Enums.GuildInvitationStatus
    createdAt?: Date | string
    respondedAt?: Date | string | null
  }

  export type GuildUpdateWithoutCreatedByInput = {
    guildId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    guildType?: EnumGuildTypeFieldUpdateOperationsInput | $Enums.GuildType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    currentOwner?: UserUpdateOneRequiredWithoutOwnedGuildsNestedInput
    members?: UserUpdateManyWithoutMemberOfGuildsNestedInput
    act?: ActUpdateOneWithoutGuildNestedInput
    venue?: VenueUpdateOneWithoutGuildNestedInput
    club?: ClubUpdateOneWithoutGuildNestedInput
    follows?: FollowUpdateManyWithoutGuildNestedInput
    invitations?: GuildInvitationUpdateManyWithoutGuildNestedInput
  }

  export type GuildUncheckedUpdateWithoutCreatedByInput = {
    guildId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    guildType?: EnumGuildTypeFieldUpdateOperationsInput | $Enums.GuildType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    currentOwnerId?: StringFieldUpdateOperationsInput | string
    actId?: NullableStringFieldUpdateOperationsInput | string | null
    venueId?: NullableStringFieldUpdateOperationsInput | string | null
    clubId?: NullableStringFieldUpdateOperationsInput | string | null
    members?: UserUncheckedUpdateManyWithoutMemberOfGuildsNestedInput
    follows?: FollowUncheckedUpdateManyWithoutGuildNestedInput
    invitations?: GuildInvitationUncheckedUpdateManyWithoutGuildNestedInput
  }

  export type GuildUncheckedUpdateManyWithoutCreatedByInput = {
    guildId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    guildType?: EnumGuildTypeFieldUpdateOperationsInput | $Enums.GuildType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    currentOwnerId?: StringFieldUpdateOperationsInput | string
    actId?: NullableStringFieldUpdateOperationsInput | string | null
    venueId?: NullableStringFieldUpdateOperationsInput | string | null
    clubId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type GuildUpdateWithoutCurrentOwnerInput = {
    guildId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    guildType?: EnumGuildTypeFieldUpdateOperationsInput | $Enums.GuildType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: UserUpdateOneWithoutCreatedGuildsNestedInput
    members?: UserUpdateManyWithoutMemberOfGuildsNestedInput
    act?: ActUpdateOneWithoutGuildNestedInput
    venue?: VenueUpdateOneWithoutGuildNestedInput
    club?: ClubUpdateOneWithoutGuildNestedInput
    follows?: FollowUpdateManyWithoutGuildNestedInput
    invitations?: GuildInvitationUpdateManyWithoutGuildNestedInput
  }

  export type GuildUncheckedUpdateWithoutCurrentOwnerInput = {
    guildId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    guildType?: EnumGuildTypeFieldUpdateOperationsInput | $Enums.GuildType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdById?: NullableStringFieldUpdateOperationsInput | string | null
    actId?: NullableStringFieldUpdateOperationsInput | string | null
    venueId?: NullableStringFieldUpdateOperationsInput | string | null
    clubId?: NullableStringFieldUpdateOperationsInput | string | null
    members?: UserUncheckedUpdateManyWithoutMemberOfGuildsNestedInput
    follows?: FollowUncheckedUpdateManyWithoutGuildNestedInput
    invitations?: GuildInvitationUncheckedUpdateManyWithoutGuildNestedInput
  }

  export type GuildUncheckedUpdateManyWithoutCurrentOwnerInput = {
    guildId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    guildType?: EnumGuildTypeFieldUpdateOperationsInput | $Enums.GuildType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdById?: NullableStringFieldUpdateOperationsInput | string | null
    actId?: NullableStringFieldUpdateOperationsInput | string | null
    venueId?: NullableStringFieldUpdateOperationsInput | string | null
    clubId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type GuildUpdateWithoutMembersInput = {
    guildId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    guildType?: EnumGuildTypeFieldUpdateOperationsInput | $Enums.GuildType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: UserUpdateOneWithoutCreatedGuildsNestedInput
    currentOwner?: UserUpdateOneRequiredWithoutOwnedGuildsNestedInput
    act?: ActUpdateOneWithoutGuildNestedInput
    venue?: VenueUpdateOneWithoutGuildNestedInput
    club?: ClubUpdateOneWithoutGuildNestedInput
    follows?: FollowUpdateManyWithoutGuildNestedInput
    invitations?: GuildInvitationUpdateManyWithoutGuildNestedInput
  }

  export type GuildUncheckedUpdateWithoutMembersInput = {
    guildId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    guildType?: EnumGuildTypeFieldUpdateOperationsInput | $Enums.GuildType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdById?: NullableStringFieldUpdateOperationsInput | string | null
    currentOwnerId?: StringFieldUpdateOperationsInput | string
    actId?: NullableStringFieldUpdateOperationsInput | string | null
    venueId?: NullableStringFieldUpdateOperationsInput | string | null
    clubId?: NullableStringFieldUpdateOperationsInput | string | null
    follows?: FollowUncheckedUpdateManyWithoutGuildNestedInput
    invitations?: GuildInvitationUncheckedUpdateManyWithoutGuildNestedInput
  }

  export type GuildUncheckedUpdateManyWithoutMembersInput = {
    guildId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    guildType?: EnumGuildTypeFieldUpdateOperationsInput | $Enums.GuildType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdById?: NullableStringFieldUpdateOperationsInput | string | null
    currentOwnerId?: StringFieldUpdateOperationsInput | string
    actId?: NullableStringFieldUpdateOperationsInput | string | null
    venueId?: NullableStringFieldUpdateOperationsInput | string | null
    clubId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type FollowUpdateWithoutUserInput = {
    followId?: StringFieldUpdateOperationsInput | string
    entityType?: EnumFollowEntityTypeFieldUpdateOperationsInput | $Enums.FollowEntityType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    followedUser?: UserUpdateOneWithoutFollowedByNestedInput
    tag?: TagUpdateOneWithoutFollowsNestedInput
    guild?: GuildUpdateOneWithoutFollowsNestedInput
  }

  export type FollowUncheckedUpdateWithoutUserInput = {
    followId?: StringFieldUpdateOperationsInput | string
    entityType?: EnumFollowEntityTypeFieldUpdateOperationsInput | $Enums.FollowEntityType
    followedUserId?: NullableStringFieldUpdateOperationsInput | string | null
    tagId?: NullableStringFieldUpdateOperationsInput | string | null
    guildId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FollowUncheckedUpdateManyWithoutUserInput = {
    followId?: StringFieldUpdateOperationsInput | string
    entityType?: EnumFollowEntityTypeFieldUpdateOperationsInput | $Enums.FollowEntityType
    followedUserId?: NullableStringFieldUpdateOperationsInput | string | null
    tagId?: NullableStringFieldUpdateOperationsInput | string | null
    guildId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FollowUpdateWithoutFollowedUserInput = {
    followId?: StringFieldUpdateOperationsInput | string
    entityType?: EnumFollowEntityTypeFieldUpdateOperationsInput | $Enums.FollowEntityType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutFollowsNestedInput
    tag?: TagUpdateOneWithoutFollowsNestedInput
    guild?: GuildUpdateOneWithoutFollowsNestedInput
  }

  export type FollowUncheckedUpdateWithoutFollowedUserInput = {
    followId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    entityType?: EnumFollowEntityTypeFieldUpdateOperationsInput | $Enums.FollowEntityType
    tagId?: NullableStringFieldUpdateOperationsInput | string | null
    guildId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FollowUncheckedUpdateManyWithoutFollowedUserInput = {
    followId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    entityType?: EnumFollowEntityTypeFieldUpdateOperationsInput | $Enums.FollowEntityType
    tagId?: NullableStringFieldUpdateOperationsInput | string | null
    guildId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FeedActivityUpdateWithoutUserInput = {
    activityId?: StringFieldUpdateOperationsInput | string
    activityType?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subjectType?: StringFieldUpdateOperationsInput | string
    subjectId?: StringFieldUpdateOperationsInput | string
    calendarEvent?: CalendarEventUpdateOneWithoutFeedActivitiesNestedInput
  }

  export type FeedActivityUncheckedUpdateWithoutUserInput = {
    activityId?: StringFieldUpdateOperationsInput | string
    activityType?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subjectType?: StringFieldUpdateOperationsInput | string
    subjectId?: StringFieldUpdateOperationsInput | string
    calendarEventId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type FeedActivityUncheckedUpdateManyWithoutUserInput = {
    activityId?: StringFieldUpdateOperationsInput | string
    activityType?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subjectType?: StringFieldUpdateOperationsInput | string
    subjectId?: StringFieldUpdateOperationsInput | string
    calendarEventId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type GuildInvitationUpdateWithoutInvitedByInput = {
    invitationId?: StringFieldUpdateOperationsInput | string
    status?: EnumGuildInvitationStatusFieldUpdateOperationsInput | $Enums.GuildInvitationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    respondedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    guild?: GuildUpdateOneRequiredWithoutInvitationsNestedInput
    invitedUser?: UserUpdateOneRequiredWithoutReceivedInvitationsNestedInput
  }

  export type GuildInvitationUncheckedUpdateWithoutInvitedByInput = {
    invitationId?: StringFieldUpdateOperationsInput | string
    guildId?: StringFieldUpdateOperationsInput | string
    invitedUserId?: StringFieldUpdateOperationsInput | string
    status?: EnumGuildInvitationStatusFieldUpdateOperationsInput | $Enums.GuildInvitationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    respondedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type GuildInvitationUncheckedUpdateManyWithoutInvitedByInput = {
    invitationId?: StringFieldUpdateOperationsInput | string
    guildId?: StringFieldUpdateOperationsInput | string
    invitedUserId?: StringFieldUpdateOperationsInput | string
    status?: EnumGuildInvitationStatusFieldUpdateOperationsInput | $Enums.GuildInvitationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    respondedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type GuildInvitationUpdateWithoutInvitedUserInput = {
    invitationId?: StringFieldUpdateOperationsInput | string
    status?: EnumGuildInvitationStatusFieldUpdateOperationsInput | $Enums.GuildInvitationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    respondedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    guild?: GuildUpdateOneRequiredWithoutInvitationsNestedInput
    invitedBy?: UserUpdateOneWithoutSentInvitationsNestedInput
  }

  export type GuildInvitationUncheckedUpdateWithoutInvitedUserInput = {
    invitationId?: StringFieldUpdateOperationsInput | string
    guildId?: StringFieldUpdateOperationsInput | string
    invitedById?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumGuildInvitationStatusFieldUpdateOperationsInput | $Enums.GuildInvitationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    respondedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type GuildInvitationUncheckedUpdateManyWithoutInvitedUserInput = {
    invitationId?: StringFieldUpdateOperationsInput | string
    guildId?: StringFieldUpdateOperationsInput | string
    invitedById?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumGuildInvitationStatusFieldUpdateOperationsInput | $Enums.GuildInvitationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    respondedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type FollowCreateManyTagInput = {
    followId?: string
    userId: string
    entityType: $Enums.FollowEntityType
    followedUserId?: string | null
    guildId?: string | null
    createdAt?: Date | string
  }

  export type FollowUpdateWithoutTagInput = {
    followId?: StringFieldUpdateOperationsInput | string
    entityType?: EnumFollowEntityTypeFieldUpdateOperationsInput | $Enums.FollowEntityType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutFollowsNestedInput
    followedUser?: UserUpdateOneWithoutFollowedByNestedInput
    guild?: GuildUpdateOneWithoutFollowsNestedInput
  }

  export type FollowUncheckedUpdateWithoutTagInput = {
    followId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    entityType?: EnumFollowEntityTypeFieldUpdateOperationsInput | $Enums.FollowEntityType
    followedUserId?: NullableStringFieldUpdateOperationsInput | string | null
    guildId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FollowUncheckedUpdateManyWithoutTagInput = {
    followId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    entityType?: EnumFollowEntityTypeFieldUpdateOperationsInput | $Enums.FollowEntityType
    followedUserId?: NullableStringFieldUpdateOperationsInput | string | null
    guildId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FollowCreateManyGuildInput = {
    followId?: string
    userId: string
    entityType: $Enums.FollowEntityType
    followedUserId?: string | null
    tagId?: string | null
    createdAt?: Date | string
  }

  export type GuildInvitationCreateManyGuildInput = {
    invitationId?: string
    invitedUserId: string
    invitedById?: string | null
    status?: $Enums.GuildInvitationStatus
    createdAt?: Date | string
    respondedAt?: Date | string | null
  }

  export type UserUpdateWithoutMemberOfGuildsInput = {
    userId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    firebaseUid?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdGuilds?: GuildUpdateManyWithoutCreatedByNestedInput
    ownedGuilds?: GuildUpdateManyWithoutCurrentOwnerNestedInput
    follows?: FollowUpdateManyWithoutUserNestedInput
    followedBy?: FollowUpdateManyWithoutFollowedUserNestedInput
    feedActivities?: FeedActivityUpdateManyWithoutUserNestedInput
    sentInvitations?: GuildInvitationUpdateManyWithoutInvitedByNestedInput
    receivedInvitations?: GuildInvitationUpdateManyWithoutInvitedUserNestedInput
  }

  export type UserUncheckedUpdateWithoutMemberOfGuildsInput = {
    userId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    firebaseUid?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdGuilds?: GuildUncheckedUpdateManyWithoutCreatedByNestedInput
    ownedGuilds?: GuildUncheckedUpdateManyWithoutCurrentOwnerNestedInput
    follows?: FollowUncheckedUpdateManyWithoutUserNestedInput
    followedBy?: FollowUncheckedUpdateManyWithoutFollowedUserNestedInput
    feedActivities?: FeedActivityUncheckedUpdateManyWithoutUserNestedInput
    sentInvitations?: GuildInvitationUncheckedUpdateManyWithoutInvitedByNestedInput
    receivedInvitations?: GuildInvitationUncheckedUpdateManyWithoutInvitedUserNestedInput
  }

  export type UserUncheckedUpdateManyWithoutMemberOfGuildsInput = {
    userId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    firebaseUid?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FollowUpdateWithoutGuildInput = {
    followId?: StringFieldUpdateOperationsInput | string
    entityType?: EnumFollowEntityTypeFieldUpdateOperationsInput | $Enums.FollowEntityType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutFollowsNestedInput
    followedUser?: UserUpdateOneWithoutFollowedByNestedInput
    tag?: TagUpdateOneWithoutFollowsNestedInput
  }

  export type FollowUncheckedUpdateWithoutGuildInput = {
    followId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    entityType?: EnumFollowEntityTypeFieldUpdateOperationsInput | $Enums.FollowEntityType
    followedUserId?: NullableStringFieldUpdateOperationsInput | string | null
    tagId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FollowUncheckedUpdateManyWithoutGuildInput = {
    followId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    entityType?: EnumFollowEntityTypeFieldUpdateOperationsInput | $Enums.FollowEntityType
    followedUserId?: NullableStringFieldUpdateOperationsInput | string | null
    tagId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GuildInvitationUpdateWithoutGuildInput = {
    invitationId?: StringFieldUpdateOperationsInput | string
    status?: EnumGuildInvitationStatusFieldUpdateOperationsInput | $Enums.GuildInvitationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    respondedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    invitedUser?: UserUpdateOneRequiredWithoutReceivedInvitationsNestedInput
    invitedBy?: UserUpdateOneWithoutSentInvitationsNestedInput
  }

  export type GuildInvitationUncheckedUpdateWithoutGuildInput = {
    invitationId?: StringFieldUpdateOperationsInput | string
    invitedUserId?: StringFieldUpdateOperationsInput | string
    invitedById?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumGuildInvitationStatusFieldUpdateOperationsInput | $Enums.GuildInvitationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    respondedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type GuildInvitationUncheckedUpdateManyWithoutGuildInput = {
    invitationId?: StringFieldUpdateOperationsInput | string
    invitedUserId?: StringFieldUpdateOperationsInput | string
    invitedById?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumGuildInvitationStatusFieldUpdateOperationsInput | $Enums.GuildInvitationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    respondedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CalendarEventUpdateWithoutActsInput = {
    eventId?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    poster?: NullableStringFieldUpdateOperationsInput | string | null
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    duration?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    venue?: VenueUpdateOneRequiredWithoutCalendarEventsNestedInput
    feedActivities?: FeedActivityUpdateManyWithoutCalendarEventNestedInput
  }

  export type CalendarEventUncheckedUpdateWithoutActsInput = {
    eventId?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    poster?: NullableStringFieldUpdateOperationsInput | string | null
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    duration?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    venueId?: StringFieldUpdateOperationsInput | string
    feedActivities?: FeedActivityUncheckedUpdateManyWithoutCalendarEventNestedInput
  }

  export type CalendarEventUncheckedUpdateManyWithoutActsInput = {
    eventId?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    poster?: NullableStringFieldUpdateOperationsInput | string | null
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    duration?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    venueId?: StringFieldUpdateOperationsInput | string
  }

  export type CalendarEventCreateManyVenueInput = {
    eventId?: string
    title?: string | null
    description?: string | null
    poster?: string | null
    startTime: Date | string
    duration: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CalendarEventUpdateWithoutVenueInput = {
    eventId?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    poster?: NullableStringFieldUpdateOperationsInput | string | null
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    duration?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    acts?: ActUpdateManyWithoutCalendarEventsNestedInput
    feedActivities?: FeedActivityUpdateManyWithoutCalendarEventNestedInput
  }

  export type CalendarEventUncheckedUpdateWithoutVenueInput = {
    eventId?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    poster?: NullableStringFieldUpdateOperationsInput | string | null
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    duration?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    acts?: ActUncheckedUpdateManyWithoutCalendarEventsNestedInput
    feedActivities?: FeedActivityUncheckedUpdateManyWithoutCalendarEventNestedInput
  }

  export type CalendarEventUncheckedUpdateManyWithoutVenueInput = {
    eventId?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    poster?: NullableStringFieldUpdateOperationsInput | string | null
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    duration?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FeedActivityCreateManyCalendarEventInput = {
    activityId?: string
    activityType: string
    createdAt?: Date | string
    subjectType: string
    subjectId: string
    userId?: string | null
  }

  export type ActUpdateWithoutCalendarEventsInput = {
    actId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    guild?: GuildUpdateOneWithoutActNestedInput
  }

  export type ActUncheckedUpdateWithoutCalendarEventsInput = {
    actId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    guild?: GuildUncheckedUpdateOneWithoutActNestedInput
  }

  export type ActUncheckedUpdateManyWithoutCalendarEventsInput = {
    actId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FeedActivityUpdateWithoutCalendarEventInput = {
    activityId?: StringFieldUpdateOperationsInput | string
    activityType?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subjectType?: StringFieldUpdateOperationsInput | string
    subjectId?: StringFieldUpdateOperationsInput | string
    user?: UserUpdateOneWithoutFeedActivitiesNestedInput
  }

  export type FeedActivityUncheckedUpdateWithoutCalendarEventInput = {
    activityId?: StringFieldUpdateOperationsInput | string
    activityType?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subjectType?: StringFieldUpdateOperationsInput | string
    subjectId?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type FeedActivityUncheckedUpdateManyWithoutCalendarEventInput = {
    activityId?: StringFieldUpdateOperationsInput | string
    activityType?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subjectType?: StringFieldUpdateOperationsInput | string
    subjectId?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}