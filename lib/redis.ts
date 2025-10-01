import Redis from "ioredis"

const globalForRedis = globalThis as unknown as {
    ioredis: Redis | undefined;
}

export const redis = globalForRedis.ioredis ?? new Redis(process.env.REDIS_URL || 'redis://:6379', {
    maxRetriesPerRequest: 3,
    retryStrategy: (times) => {
        const delay = Math.min(times * 50, 2000)
        return delay
    },
});

if (process.env.NODE_ENV !== 'production') {
    globalForRedis.ioredis = redis
}

//Cache utility functions
export const cacheService = {
    async get<T>(key: string) : Promise<T | null> {
        try{
            const data = await redis.get(key);
            return data ? JSON.parse(data) : null;  
          } catch (error) {
              console.error('Redis Get error:', error);
              return null
        }
    },

    async set(key: string, value: any, expirationInSeconds: number = 3600) : Promise<void> {
        try {
            await redis.setex(key, expirationInSeconds, JSON.stringify(value));
        } catch(error) {
            console.error('Redis Set error:', error)
        }
    },

   async del(key: string) : Promise<void> {
    try{
        await redis.del(key);
    } catch (error) {
        console.error("Redis Del error", error)
    }
   },

   async delPattern(pattern: string) : Promise<void> {
    try{
        const keys = await redis.keys(pattern);
        if (keys.length > 0) {
            await redis.del(...keys)
        }
    } catch(error) {
        console.error("Redis Del Pattern error", error)
    }
   }

}


