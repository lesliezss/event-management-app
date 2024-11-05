### GET /api/events
- **Description**: response with an array of all events.
- **Example Request**:
  - **Method**: GET
  - **URL**: `https://your-api-domain.com/api/events`
- **Example Response**:
  ```json
  [
      {
        event_id: 1,
        event_name: 'Tech meeting',
        event_date: 2024-12-20T00:00:00.000Z,
        location_name: 'Meeting Room 1',
        guest_number: 5
      },
      {
        event_id: 2,
        event_name: 'Music festival',
        event_date: 2025-01-15T00:00:00.000Z,
        location_name: 'Activity Centre',
        guest_number: 1
      },
      {
        event_id: 3,
        event_name: 'Art Sales',
        event_date: 2024-12-01T00:00:00.000Z,
        location_name: 'Meeting Room 2',
        guest_number: 1
      }
    ]
  ```
### GET /api/events/search
- **Description**: response with an array of matching events
 **Parameters**:
  - `name` (required): the search input
- **Example Request**:
  - **Method**: GET
  - **URL**: `https://your-api-domain.com/api/events/search?name=Tech`
- **Example Response**:
  ```json
  [
      {
        event_name: 'Tech meeting',
        event_date: '2024-10-19T23:00:00.000Z',
        location_name: 'Meeting Room 1',
        guest_number: 2
      }
    ]
  ```
### POST /api/events
- **Description**: add an event, response with the posted event
 **Parameters**:
  - `event_name` 
  - `event_date`
  - `location_id`
- **Example Request**:
  - **Method**: POST
  - **URL**: `https://your-api-domain.com/api/events`
- **Example Response**:
  ```json
  [
      {
        event_id: expect.any(Number),
          event_name: "New Event",
          event_date: "2025-01-01T00:00:00.000Z",
          location_id: 1,
      }
    ]
  ```

  ### DELETE /api/events/:event_id
- **Description**: delete an existing event by event_id
 **Parameters**:
  - `event_id` 
- **Example Request**:
  - **Method**: DELETE
  - **URL**: `https://your-api-domain.com/api/events/:event_id`
- **Example Response**:
  ```json
  
  ```

  ### GET /api/locations
- **Description**: response with an array of all locations.
- **Example Request**:
  - **Method**: GET
  - **URL**: `https://your-api-domain.com/api/locations`
- **Example Response**:
  ```json
  [
      {
        location_name: 'Meeting Room 1',
        capacity: 8,
        total_guests: 5,
        occupancy_rate: '62.50',
        guest_to_capacity: '5/8'
      },
      {
        location_name: 'Meeting Room 2',
        capacity: 15,
        total_guests: 1,
        occupancy_rate: '6.67',
        guest_to_capacity: '1/15'
      },
      {
        location_name: 'Activity Centre',
        capacity: 20,
        total_guests: 1,
        occupancy_rate: '5.00',
        guest_to_capacity: '1/20'
      }
    ]
  ```

  ### GET /api/participants
- **Description**: response with an array of all participants.
- **Example Request**:
  - **Method**: GET
  - **URL**: `https://your-api-domain.com/api/participants`
- **Example Response**:
  ```json
  [
      {
        name: 'John Doe',
        email: 'john@example.com',
        event_name: 'Tech meeting'
      },
      {
        name: 'Jane Smith',
        email: 'jane@example.com',
        event_name: 'Tech meeting'
      },
      {
        name: 'Alice Johnson',
        email: 'alice@example.com',
        event_name: 'Tech meeting'
      },
      {
        name: 'Alice Johnson',
        email: 'alice@example.com',
        event_name: 'Music festival'
      },
      {
        name: 'Bob Brown',
        email: 'bob@example.com',
        event_name: 'Art Sales'
      },
      {
        name: 'Leslie Zhan',
        email: 'lesliezhan@example.com',
        event_name: 'Tech meeting'
      },
      {
        name: 'abc def',
        email: 'abcdef@example.com',
        event_name: 'Tech meeting'
      }
    ]
  ```

  ### POST /api/participants
- **Description**: add a participant, response with the posted participant
 **Parameters**:
  - `name` 
  - `email`
  - `event_id`
- **Example Request**:
  - **Method**: POST
  - **URL**: `https://your-api-domain.com/api/participants`
- **Example Response**:
  ```json
  [
      {
      participant_id: 7,
      name: 'New Participants',
      email: 'new@example.com'
    }
    ]
  ```
  ### PATCH /api/participants/participant_id
- **Description**: update a participant, response with the updated participant
 **Parameters**:
  - `name` 
  - `email`
  - `event_id`
- **Example Request**:
  - **Method**: PATCH
  - **URL**: `https://your-api-domain.com/api/participants/participant_id`
- **Example Response**:
  ```json
  [
      {
      participant_id: 7,
      name: 'New Participants',
      email: 'new@example.com'
    }
    ]
  ```

    ### GET /api/participants/event_id
- **Description**: response with an array of partiipants at a event
- **Example Request**:
  - **Method**: GET
  - **URL**: `https://your-api-domain.com/api/participants/event_id`
- **Example Response**:
  ```json
  [
      {
        participant_id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        event_id: 1
      },
      {
        participant_id: 2,
        name: 'Jane Smith',
        email: 'jane@example.com',
        event_id: 1
      },
      {
        participant_id: 3,
        name: 'Alice Johnson',
        email: 'alice@example.com',
        event_id: 1
      },
      {
        participant_id: 3,
        name: 'Alice Johnson',
        email: 'alice@example.com',
        event_id: 2
      },
      {
        participant_id: 4,
        name: 'Bob Brown',
        email: 'bob@example.com',
        event_id: 3
      },
      {
        participant_id: 5,
        name: 'Leslie Zhan',
        email: 'lesliezhan@example.com',
        event_id: 1
      },
      {
        participant_id: 6,
        name: 'abc def',
        email: 'abcdef@example.com',
        event_id: 1
      }
    ]
  ```