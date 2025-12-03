import { Logger } from '@juicyllama/utils'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { type ChatPostMessageArguments, WebClient } from '@slack/web-api'
import { v4 as uuidv4 } from 'uuid'

@Injectable()
export class SlackService {
	constructor(
		private readonly configService: ConfigService,
		private readonly logger: Logger,
	) {}

	async postMessage(req: ChatPostMessageArguments): Promise<void> {
		const token = this.configService.get<string>('SLACK_TOKEN')

		if (!token) {
			this.logger.error('SLACK_TOKEN is not defined in environment variables', {
				context: ['SlackService', 'postMessage'],
			})
			throw new Error('SLACK_TOKEN is not defined in environment variables')
		}

		if (!req.channel) {
			const defaultChannel = this.configService.get<string>('SLACK_DEFAULT_CHANNEL')
			if (!defaultChannel) {
				this.logger.error(
					'No channel specified and SLACK_DEFAULT_CHANNEL is not defined in environment variables',
					{
						context: ['SlackService', 'postMessage'],
					},
				)
				throw new Error(
					'No channel specified and SLACK_DEFAULT_CHANNEL is not defined in environment variables',
				)
			}
			req.channel = defaultChannel
		}

		const web = new WebClient(token)

		const uuid4 = uuidv4()

		console.log(uuid4)

		this.logger.debug('Request to Slack', {
			context: ['SlackService', 'postMessage', uuid4],
			params: { ...req },
		})

		const response = await web.chat.postMessage(req)

		this.logger.debug('Response from Slack', {
			context: ['SlackService', 'postMessage', uuid4],
			params: { ...response },
		})
	}
}
