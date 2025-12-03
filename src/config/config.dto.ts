import { IsOptional, IsString } from 'class-validator'

export class SlackConfigDto {
	@IsString()
	SLACK_TOKEN!: string

	@IsString()
	@IsOptional()
	SLACK_DEFAULT_CHANNEL?: string
}
