### GET /api/grades
- **Description**: response with an array of all events.
- **Example Request**:
  - **Method**: GET
  - **URL**: `https://your-api-domain.com/api/events`
- **Example Response**:
  ```json
  [
        {
          event_name: 'Tech meeting',
          event_date: 2024-10-19T23:00:00.000Z,
          location_name: 'Meeting Room 1',
          guest_number: 2
        },
        {
          event_name: 'Music festival',
          event_date: 2024-11-15T00:00:00.000Z,
          location_name: 'Meeting Room 1',
          guest_number: 1
        },
        {
          event_name: 'Art Sales',
          event_date: 2024-12-01T00:00:00.000Z,
          location_name: 'Meeting Room 2',
          guest_number: 1
        }
      ]
  ```