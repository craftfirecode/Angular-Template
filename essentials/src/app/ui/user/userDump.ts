export interface IUsers {
    id: number;
    admin: boolean;
    name: string;
    story: string;
    img: string;
}

export const usersDump: IUsers[] = [
    {
        "id": 1,
        "admin": false,
        "name": "John Doe",
        "story": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        "img": "https://i.pravatar.cc/150?img=13"
    },
    {
        "id": 2,
        "admin": false,
        "name": "Jane Smith",
        "story": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        "img": "https://i.pravatar.cc/150?img=12"
    },
    {
        "id": 3,
        "admin": true,
        "name": "Dr. Paula Johnson",
        "story": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        "img": "https://i.pravatar.cc/150?img=5"
    }
]
