import { IdentityEpisodeRequest } from './identity-friend.request';

export class PatchSentenceRequest extends IdentityEpisodeRequest {
  index: number;
  speaker?: string;
  sentence?: string;
  th?: string;
}
