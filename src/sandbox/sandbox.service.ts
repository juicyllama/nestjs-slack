import { SlackService } from '../slack/slack.service'
import { Logger } from '@juicyllama/utils'
import { Injectable, OnApplicationBootstrap } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class SandboxService implements OnApplicationBootstrap {
	private readonly logger = new Logger(['@juicyllama/nestjs-slack', SandboxService.name])

	constructor(
		private readonly configService: ConfigService,
		private readonly slackService: SlackService,
	) {}

	async onApplicationBootstrap() {
		this.logger.log('Running sandbox service...', { context: ['send'] })

		console.log('Environment Variables:', {
			SLACK_TOKEN: this.configService.get<string>('SLACK_TOKEN') ? 'DEFINED' : 'UNDEFINED',
			SLACK_DEFAULT_CHANNEL: this.configService.get<string>('SLACK_DEFAULT_CHANNEL') ? 'DEFINED' : 'UNDEFINED',
		})

		await this.slackService.postMessage({
			channel: this.configService.get<string>('SLACK_DEFAULT_CHANNEL') ?? '#general',
			text: 'Hello from SandboxService!',
		})

		this.logger.log('Sandbox service completed.', { context: ['send'] })
	}
}
