import { SlackModule } from '../slack/slack.module'
import { SandboxService } from './sandbox.service'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

@Module({
	imports: [ConfigModule.forRoot(), SlackModule],
	controllers: [],
	providers: [SandboxService],
	exports: [SandboxService],
})
export class SandboxModule {}
