import { Injectable } from '@nestjs/common';
import { jsonEvent } from '@eventstore/db-client';
import { eventStore } from '../../infrastructure/event-store';

@Injectable()
export class EventStoreService {
  async save(aggregateId: string, type: string, data: Record<string, unknown>) {
    await eventStore.appendToStream(
      aggregateId,
      jsonEvent({
        type,
        data,
      }),
    );
  }

  async getEvents(aggregateId: string) {
    const events = [];
    // eslint-disable-next-line no-restricted-syntax
    for await (const { event } of eventStore.readStream(aggregateId)) {
      if (!event) return;
      events.push(event);
    }
    return events;
  }
}
