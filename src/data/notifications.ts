import { NotificationItem, Conversation } from '../types/index.ts';

export const NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    type: 'judge_score',
    actorName: 'Sebastian Vogel (Gastronomy Critic)',
    actorAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
    content: 'evaluated your dish in "The Ultimate Mushroom Challenge" with an official score of 95.7/100 ("A breathtaking demonstration of computational gastronomy").',
    targetPreview: 'Shiitake-Koji Glazed Duck Breast',
    timestamp: '25m ago',
    isRead: false
  },
  {
    id: 'notif-2',
    type: 'career_inquiry',
    actorName: 'Annika Berg (Global Gastronomy Search)',
    actorAvatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=400&q=80',
    content: 'sent you an executive recruitment invitation for Senior Sous Chef (R&D) at L’Astrance Moderne (Paris, 3★).',
    timestamp: '2h ago',
    isRead: false
  },
  {
    id: 'notif-3',
    type: 'battle_result',
    actorName: 'Foodsta Battle Council',
    actorAvatar: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=400&q=80',
    content: 'Your submission "Shiitake-Koji Glazed Duck Breast" is currently ranked #1 on the Mushroom Challenge leaderboard!',
    timestamp: '5h ago',
    isRead: false
  },
  {
    id: 'notif-4',
    type: 'like',
    actorName: 'Marcus Vander',
    actorAvatar: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=400&q=80',
    content: 'liked your recipe "Computational Gastronomy: Shiitake & Cacao Glazed Duck Breast".',
    targetPreview: 'https://images.unsplash.com/photo-1514944298352-78d120a1db4b?auto=format&fit=crop&w=200&q=80',
    timestamp: '7h ago',
    isRead: true
  },
  {
    id: 'notif-5',
    type: 'comment',
    actorName: 'Elena Morales',
    actorAvatar: 'https://images.unsplash.com/photo-1583394293214-28ded15ee548?auto=format&fit=crop&w=400&q=80',
    content: 'commented: "The clarity of that dashi gelee is pure poetry Sensei."',
    timestamp: '1d ago',
    isRead: true
  },
  {
    id: 'notif-6',
    type: 'follow',
    actorName: 'Liam O’Connor (Chapter One)',
    actorAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80',
    content: 'started following your culinary journey.',
    timestamp: '2d ago',
    isRead: true
  }
];

export const CONVERSATIONS: Conversation[] = [
  {
    id: 'conv-1',
    participant: {
      id: 'chef-1',
      name: 'Marcus Vander',
      username: 'marcus_vander',
      avatar: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=400&q=80',
      title: '3-Star Michelin Chef',
      restaurant: 'L’Astrance Moderne',
      isVerified: true
    },
    lastMessage: 'Clara, your extraction technique for the shiitake guanylate was exceptional. We should talk about an R&D collaboration in Paris.',
    timestamp: '15m ago',
    unreadCount: 1,
    messages: [
      {
        id: 'm-1',
        senderId: 'chef-1',
        senderName: 'Marcus Vander',
        senderAvatar: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=400&q=80',
        recipientId: 'chef-4',
        text: 'Hello Clara, I watched your presentation on the 1-Octen-3-ol compound network.',
        timestamp: '10:14 AM',
        isSelf: false
      },
      {
        id: 'm-2',
        senderId: 'chef-4',
        senderName: 'Clara Chen',
        senderAvatar: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=400&q=80',
        recipientId: 'chef-1',
        text: 'Thank you Chef Marcus! It was an honor to present the data from FoodScope Labs.',
        timestamp: '10:20 AM',
        isSelf: true
      },
      {
        id: 'm-3',
        senderId: 'chef-1',
        senderName: 'Marcus Vander',
        senderAvatar: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=400&q=80',
        recipientId: 'chef-4',
        text: 'Clara, your extraction technique for the shiitake guanylate was exceptional. We should talk about an R&D collaboration in Paris.',
        timestamp: '10:35 AM',
        isSelf: false
      }
    ]
  },
  {
    id: 'conv-2',
    participant: {
      id: 'chef-20',
      name: 'Annika Berg',
      username: 'annika_berg',
      avatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=400&q=80',
      title: 'Hospitality Recruiter',
      restaurant: 'Global Gastronomy Search',
      isVerified: true
    },
    lastMessage: 'Would you be open to an exploratory discussion regarding the Senior Sous Chef role?',
    timestamp: '2h ago',
    unreadCount: 0,
    messages: [
      {
        id: 'm-4',
        senderId: 'chef-20',
        senderName: 'Annika Berg',
        senderAvatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=400&q=80',
        recipientId: 'chef-4',
        text: 'Good morning Chef Clara. I represent a 3-star Michelin property looking for an R&D lead with computational gastronomy experience.',
        timestamp: 'Yesterday',
        isSelf: false
      },
      {
        id: 'm-5',
        senderId: 'chef-20',
        senderName: 'Annika Berg',
        senderAvatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=400&q=80',
        recipientId: 'chef-4',
        text: 'Would you be open to an exploratory discussion regarding the Senior Sous Chef role?',
        timestamp: '2h ago',
        isSelf: false
      }
    ]
  }
];
