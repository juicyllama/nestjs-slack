import { SlackConfigDto } from '../config/config.dto'
import { ConfigValidationModule } from '../config/config.module'
import { SlackService } from './slack.service'
import { Logger } from '@juicyllama/utils'
import { Module } from '@nestjs/common'

@Module({
	imports: [ConfigValidationModule.register(SlackConfigDto)],
	providers: [
		SlackService,
		{
			provide: Logger,
			useFactory: () => {
				return new Logger(['@juicyllama/nestjs-slack'])
			},
		},
	],
	exports: [SlackService],
})
export class SlackModule {}
