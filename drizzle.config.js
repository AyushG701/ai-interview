/** @type { import("drizzle-kit").Config } */
export default {
  schema: "./utils/schema.js",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://finassist_db_owner:vufr08WLOHwz@ep-tight-art-a5a66pi2.us-east-2.aws.neon.tech/AI-Interview?sslmode=require",
  },
};
