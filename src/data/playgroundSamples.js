export const playgroundSamples = [
  {
    id: "sample-1",
    name: "REST API Response",
    code: `{
  "status": "success",
  "data": {
    "users": [
      {
        "id": 1,
        "name": "Leanne Graham",
        "username": "Bret",
        "email": "Sincere@april.biz"
      },
      {
        "id": 2,
        "name": "Ervin Howell",
        "username": "Antonette",
        "email": "Shanna@melissa.tv"
      }
    ]
  },
  "meta": {
    "total": 2,
    "page": 1
  }
}`
  },
  {
    id: "sample-2",
    name: "Weather Forecast",
    code: `{
  "location": {
    "city": "San Francisco",
    "country": "US",
    "coordinates": {
      "lat": 37.7749,
      "lng": -122.4194
    }
  },
  "current": {
    "temperature": 18.5,
    "humidity": 72,
    "description": "Partly cloudy",
    "windSpeed": 12.3,
    "isDay": true
  },
  "forecast": [
    {
      "day": "Monday",
      "high": 21,
      "low": 14,
      "precipitation": null
    },
    {
      "day": "Tuesday",
      "high": 19,
      "low": 13,
      "precipitation": 0.4
    }
  ]
}`
  },
  {
    id: "sample-3",
    name: "Bookstore Inventory",
    code: `{
  "store": {
    "book": [
      {
        "category": "reference",
        "author": "Nigel Rees",
        "title": "Sayings of the Century",
        "price": 8.95
      },
      {
        "category": "fiction",
        "author": "Evelyn Waugh",
        "title": "Sword of Honour",
        "price": 12.99
      }
    ],
    "bicycle": {
      "color": "red",
      "price": 19.95,
      "inStock": true,
      "metadata": null
    }
  }
}`
  },
  {
    id: "sample-4",
    name: "GitHub Event",
    code: `{
  "event": "push",
  "repository": {
    "name": "jsonlabs",
    "full_name": "team/jsonlabs",
    "private": false,
    "stars": 42
  },
  "commits": [
    {
      "sha": "a1b2c3d4e5f6",
      "message": "Add playground samples",
      "author": {
        "name": "Alice",
        "email": "alice@example.com"
      },
      "timestamp": "2025-06-24T15:30:00Z"
    }
  ],
  "pusher": {
    "name": "Alice",
    "email": "alice@example.com"
  }
}`
  }
];
