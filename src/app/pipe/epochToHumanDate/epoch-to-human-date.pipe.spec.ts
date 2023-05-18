import { EpochToHumanDatePipe } from './epoch-to-human-date.pipe';

describe('EpochToHumanDatePipe', () => {
  it('create an instance', () => {
    const pipe = new EpochToHumanDatePipe();
    expect(pipe).toBeTruthy();
  });
});
