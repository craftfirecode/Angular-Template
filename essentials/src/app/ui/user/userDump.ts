export interface IUsers {
  id: number;
  name: string;
  story: string;
  img: string;
}

export const usersDump: IUsers[] = [
  {
    "id": 1,
    "name": "John Doe",
    "story": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "img": "https://i.pravatar.cc/150?img=1"
  },
  {
    "id": 2,
    "name": "Jane Smith",
    "story": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "img": "https://i.pravatar.cc/150?img=2"
  },
  {
    "id": 3,
    "name": "Paul Johnson",
    "story": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "img": "https://i.pravatar.cc/150?img=3"
  }
]
