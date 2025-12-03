import { InjectionToken, ModuleMetadata, OptionalFactoryDependency, Type } from '@nestjs/common'
import { WebClientOptions } from '@slack/web-api'

export interface SlackConfig {
	/**
	 * You'll need a token to authenticate with Slack Web API
	 * Read more: https://api.slack.com/tutorials/tracks/getting-a-token
	 */
	token: string

	/**
	 * This option is used when channel isn't defined
	 * when sending a request.
	 */
	defaultChannel?: string

	clientOptions?: WebClientOptions
}

export type SlackSyncConfig = SlackConfig & {
	// If true, registers `SlackModule` as a global module.
	isGlobal?: boolean
}

export interface SlackAsyncConfig extends Pick<ModuleMetadata, 'imports'> {
	useClass?: Type<SlackConfigFactory>
	useFactory?: (...args: unknown[]) => Promise<SlackConfig> | SlackConfig
	inject?: Array<InjectionToken | OptionalFactoryDependency>
	useExisting?: Type<SlackConfigFactory>

	// If true, registers `SlackModule` as a global module.
	isGlobal?: boolean
}

export interface SlackConfigFactory {
	slackConfigModuleOptions(): Promise<SlackConfig> | SlackConfig
}
