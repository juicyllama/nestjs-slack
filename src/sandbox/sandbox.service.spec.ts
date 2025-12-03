import type { SlackService } from '../slack/slack.service'
import { SandboxService } from './sandbox.service'
import { ConfigService } from '@nestjs/config'

describe('SandboxService', () => {
	let configGetMock: jest.Mock
	let configService: ConfigService
	let slackPostMessageMock: jest.Mock
	let slackService: SlackService
	let service: SandboxService

	beforeEach(() => {
		configGetMock = jest.fn()
		slackPostMessageMock = jest.fn().mockResolvedValue(undefined)

		configService = {
			get: configGetMock,
		} as unknown as ConfigService

		slackService = {
			postMessage: slackPostMessageMock,
		} as unknown as SlackService

		service = new SandboxService(configService, slackService)
	})

	describe('onApplicationBootstrap', () => {
		it('posts a Slack message using the configured default channel', async () => {
			const configValues = {
				SLACK_TOKEN: 'token',
				SLACK_DEFAULT_CHANNEL: '#alerts',
			}

			configGetMock.mockImplementation((key: string) => configValues[key as keyof typeof configValues])

			await service.onApplicationBootstrap()

			expect(slackPostMessageMock).toHaveBeenCalledTimes(1)
			expect(slackPostMessageMock).toHaveBeenCalledWith({
				channel: '#alerts',
				text: 'Hello from SandboxService!',
			})
		})

		it('falls back to #general when no default channel is configured', async () => {
			configGetMock.mockImplementation((key: string) => (key === 'SLACK_TOKEN' ? 'token' : undefined))

			await service.onApplicationBootstrap()

			expect(slackPostMessageMock).toHaveBeenCalledTimes(1)
			expect(slackPostMessageMock).toHaveBeenCalledWith({
				channel: '#general',
				text: 'Hello from SandboxService!',
			})
		})
	})
})
