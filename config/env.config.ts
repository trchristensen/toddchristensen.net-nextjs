function getEnvironmentVariable(environmentVariable: string): string {
  const unvalidatedEnvironmentVariable = process.env[environmentVariable];
  if (!unvalidatedEnvironmentVariable) {
    throw new Error(
      `Couldn't find environment variable: ${environmentVariable}`
    );
  } else {
    return unvalidatedEnvironmentVariable;
  }
}

export const env = {
  SPOTIFY_CLIENT_ID: getEnvironmentVariable("SPOTIFY_CLIENT_ID"),
  SPOTIFY_CLIENT_SECRET: getEnvironmentVariable("SPOTIFY_CLIENT_SECRET"),
  SPOTIFY_REFRESH_TOKEN: getEnvironmentVariable("SPOTIFY_REFRESH_TOKEN"),
  GITHUB_CLIENT_KEY: getEnvironmentVariable("GITHUB_CLIENT_KEY"),
  GITHUB_CLIENT_SECRET: getEnvironmentVariable("GITHUB_CLIENT_SECRET"),
  SITENAME: getEnvironmentVariable("SITENAME"),
  NEXTAUTH_URL: getEnvironmentVariable("NEXTAUTH_URL"),
  OPENWEATHER_API_KEY: getEnvironmentVariable("OPENWEATHER_API_KEY"),
};
