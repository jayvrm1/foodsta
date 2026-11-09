import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Chef, Post, Recipe, Competition, BattleSubmission, JobPosition, 
  NotificationItem, Conversation, Story, JudgeCriteriaScores 
} from '../types/index.ts';
import { CHEFS, CURRENT_USER_CHEF } from '../data/chefs.ts';
import { POSTS } from '../data/posts.ts';
import { RECIPES } from '../data/recipes.ts';
import { COMPETITIONS } from '../data/competitions.ts';
import { JOB_POSITIONS } from '../data/jobs.ts';
import { NOTIFICATIONS, CONVERSATIONS } from '../data/notifications.ts';
import { STORIES } from '../data/stories.ts';
import { calculateJudgeScore, rankBattleSubmissions } from '../services/gastronomyLogic.ts';

interface AppContextType {
  currentUser: Chef;
  switchUser: (chefId: string) => void;
  chefs: Chef[];
  toggleFollowChef: (chefId: string) => void;
  posts: Post[];
  toggleLikePost: (postId: string) => void;
  toggleSavePost: (postId: string) => void;
  addCommentToPost: (postId: string, text: string) => void;
  addPost: (newPost: Omit<Post, 'id' | 'chefId' | 'chefUsername' | 'chefName' | 'chefAvatar' | 'chefRestaurant' | 'isVerified' | 'likesCount' | 'commentsCount' | 'sharesCount' | 'savesCount' | 'isLiked' | 'isSaved' | 'timestamp' | 'comments'>) => void;
  recipes: Recipe[];
  saveRecipe: (recipeId: string) => void;
  competitions: Competition[];
  submitDishToBattle: (battleId: string, submission: {
    dishName: string;
    imageUrl: string;
    inspiration: string;
    cookingTimeMinutes: number;
    ingredients: string;
    instructions: string;
    compoundsIdentified: string[];
  }) => void;
  voteSubmission: (battleId: string, submissionId: string) => void;
  evaluateSubmissionAsJudge: (battleId: string, submissionId: string, scores: JudgeCriteriaScores, feedback: string) => void;
  jobs: JobPosition[];
  applyToJob: (jobId: string) => void;
  notifications: NotificationItem[];
  markNotificationAsRead: (id: string) => void;
  conversations: Conversation[];
  sendMessage: (conversationId: string, text: string) => void;
  stories: Story[];
  // Modals & Navigation triggers
  activeStory: Story | null;
  setActiveStory: (story: Story | null) => void;
  activeRecipeModal: Recipe | null;
  setActiveRecipeModal: (recipe: Recipe | null) => void;
  activePostDetail: Post | null;
  setActivePostDetail: (post: Post | null) => void;
  isCreatePostOpen: boolean;
  setIsCreatePostOpen: (open: boolean) => void;
  activeBattleSubmitId: string | null;
  setActiveBattleSubmitId: (battleId: string | null) => void;
  activeJudgeSubmission: { battleId: string; submission: BattleSubmission } | null;
  setActiveJudgeSubmission: (data: { battleId: string; submission: BattleSubmission } | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<Chef>(() => {
    const saved = localStorage.getItem('foodsta_current_user_id');
    const found = CHEFS.find(c => c.id === saved);
    return found || CURRENT_USER_CHEF;
  });

  const [chefs, setChefs] = useState<Chef[]>(() => {
    const savedFollows = localStorage.getItem('foodsta_followed_chefs');
    if (savedFollows) {
      try {
        const followedIds: string[] = JSON.parse(savedFollows);
        return CHEFS.map(c => ({
          ...c,
          isFollowing: followedIds.includes(c.id)
        }));
      } catch {
        return CHEFS;
      }
    }
    return CHEFS;
  });

  const [posts, setPosts] = useState<Post[]>(() => {
    const savedPosts = localStorage.getItem('foodsta_posts');
    if (savedPosts) {
      try {
        return JSON.parse(savedPosts);
      } catch {
        return POSTS;
      }
    }
    return POSTS;
  });

  const [recipes, setRecipes] = useState<Recipe[]>(RECIPES);
  const [competitions, setCompetitions] = useState<Competition[]>(() => {
    const saved = localStorage.getItem('foodsta_competitions');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return COMPETITIONS;
      }
    }
    return COMPETITIONS;
  });

  const [jobs, setJobs] = useState<JobPosition[]>(() => {
    const saved = localStorage.getItem('foodsta_applied_jobs');
    if (saved) {
      try {
        const appliedIds: string[] = JSON.parse(saved);
        return JOB_POSITIONS.map(j => ({
          ...j,
          isApplied: appliedIds.includes(j.id)
        }));
      } catch {
        return JOB_POSITIONS;
      }
    }
    return JOB_POSITIONS;
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(NOTIFICATIONS);
  const [conversations, setConversations] = useState<Conversation[]>(CONVERSATIONS);
  const [stories] = useState<Story[]>(STORIES);

  // Modals state
  const [activeStory, setActiveStory] = useState<Story | null>(null);
  const [activeRecipeModal, setActiveRecipeModal] = useState<Recipe | null>(null);
  const [activePostDetail, setActivePostDetail] = useState<Post | null>(null);
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [activeBattleSubmitId, setActiveBattleSubmitId] = useState<string | null>(null);
  const [activeJudgeSubmission, setActiveJudgeSubmission] = useState<{ battleId: string; submission: BattleSubmission } | null>(null);

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem('foodsta_current_user_id', currentUser.id);
  }, [currentUser]);

  useEffect(() => {
    const followed = chefs.filter(c => c.isFollowing).map(c => c.id);
    localStorage.setItem('foodsta_followed_chefs', JSON.stringify(followed));
  }, [chefs]);

  useEffect(() => {
    localStorage.setItem('foodsta_posts', JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    localStorage.setItem('foodsta_competitions', JSON.stringify(competitions));
  }, [competitions]);

  const switchUser = (chefId: string) => {
    const found = chefs.find(c => c.id === chefId);
    if (found) {
      setCurrentUser(found);
    }
  };

  const toggleFollowChef = (chefId: string) => {
    setChefs(prev => prev.map(c => {
      if (c.id === chefId) {
        const nextFollowing = !c.isFollowing;
        return {
          ...c,
          isFollowing: nextFollowing,
          followersCount: nextFollowing ? c.followersCount + 1 : Math.max(0, c.followersCount - 1)
        };
      }
      return c;
    }));
  };

  const toggleLikePost = (postId: string) => {
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        const nextLiked = !p.isLiked;
        return {
          ...p,
          isLiked: nextLiked,
          likesCount: nextLiked ? p.likesCount + 1 : Math.max(0, p.likesCount - 1)
        };
      }
      return p;
    }));

    if (activePostDetail && activePostDetail.id === postId) {
      setActivePostDetail(prev => prev ? {
        ...prev,
        isLiked: !prev.isLiked,
        likesCount: !prev.isLiked ? prev.likesCount + 1 : Math.max(0, prev.likesCount - 1)
      } : null);
    }
  };

  const toggleSavePost = (postId: string) => {
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        const nextSaved = !p.isSaved;
        return {
          ...p,
          isSaved: nextSaved,
          savesCount: nextSaved ? p.savesCount + 1 : Math.max(0, p.savesCount - 1)
        };
      }
      return p;
    }));
  };

  const addCommentToPost = (postId: string, text: string) => {
    if (!text.trim()) return;
    const newComment = {
      id: `comment-${Date.now()}`,
      username: currentUser.username,
      userAvatar: currentUser.avatar,
      userTitle: currentUser.title,
      isVerified: currentUser.isVerified,
      content: text.trim(),
      timestamp: 'Just now',
      likesCount: 0
    };

    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          commentsCount: p.commentsCount + 1,
          comments: [newComment, ...p.comments]
        };
      }
      return p;
    }));

    if (activePostDetail && activePostDetail.id === postId) {
      setActivePostDetail(prev => prev ? {
        ...prev,
        commentsCount: prev.commentsCount + 1,
        comments: [newComment, ...prev.comments]
      } : null);
    }
  };

  const addPost = (newPostData: Omit<Post, 'id' | 'chefId' | 'chefUsername' | 'chefName' | 'chefAvatar' | 'chefRestaurant' | 'isVerified' | 'likesCount' | 'commentsCount' | 'sharesCount' | 'savesCount' | 'isLiked' | 'isSaved' | 'timestamp' | 'comments'>) => {
    const created: Post = {
      ...newPostData,
      id: `post-${Date.now()}`,
      chefId: currentUser.id,
      chefUsername: currentUser.username,
      chefName: currentUser.name,
      chefAvatar: currentUser.avatar,
      chefRestaurant: `${currentUser.restaurant} (${currentUser.restaurantLocation})`,
      isVerified: currentUser.isVerified,
      isMasterChef: currentUser.isMasterChef,
      likesCount: 1,
      commentsCount: 0,
      sharesCount: 0,
      savesCount: 0,
      isLiked: true,
      isSaved: false,
      timestamp: 'Just now',
      comments: []
    };

    setPosts(prev => [created, ...prev]);

    // Update user post count
    setChefs(prev => prev.map(c => c.id === currentUser.id ? { ...c, postsCount: c.postsCount + 1 } : c));
    setCurrentUser(prev => ({ ...prev, postsCount: prev.postsCount + 1 }));
  };

  const saveRecipe = (recipeId: string) => {
    setRecipes(prev => prev.map(r => {
      if (r.id === recipeId) {
        return { ...r, savesCount: r.savesCount + 1 };
      }
      return r;
    }));
  };

  const submitDishToBattle = (battleId: string, submission: {
    dishName: string;
    imageUrl: string;
    inspiration: string;
    cookingTimeMinutes: number;
    ingredients: string;
    instructions: string;
    compoundsIdentified: string[];
  }) => {
    const newSubmission: BattleSubmission = {
      id: `sub-${Date.now()}`,
      battleId,
      chefId: currentUser.id,
      chefUsername: currentUser.username,
      chefName: currentUser.name,
      chefAvatar: currentUser.avatar,
      chefRestaurant: currentUser.restaurant,
      dishName: submission.dishName,
      imageUrl: submission.imageUrl || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80',
      inspiration: submission.inspiration,
      ingredients: submission.ingredients.split('\n').filter(Boolean).map(line => ({
        name: line,
        quantity: 'As needed'
      })),
      instructions: submission.instructions.split('\n').filter(Boolean),
      cookingTimeMinutes: submission.cookingTimeMinutes || 45,
      flavorCompoundsIdentified: submission.compoundsIdentified.length ? submission.compoundsIdentified : ['Methional', '1-Octen-3-ol', 'Glutamic Acid'],
      recipeDbSynergyIndex: 92,
      flavorDbPairingScore: 94,
      communityVotes: 1,
      hasVoted: true,
      judgeEvaluations: [],
      expertCompositeScore: 92.5,
      submittedAt: 'Just now'
    };

    setCompetitions(prev => prev.map(c => {
      if (c.id === battleId) {
        const updatedSubs = rankBattleSubmissions([newSubmission, ...c.submissions]);
        return {
          ...c,
          participantsCount: c.participantsCount + 1,
          submissions: updatedSubs
        };
      }
      return c;
    }));

    // Also auto-post to feed
    addPost({
      imageUrl: newSubmission.imageUrl,
      mediaType: 'image',
      caption: `Competition Submission for ${battleId.replace('battle-', '').toUpperCase()}: "${submission.dishName}". ${submission.inspiration}`,
      hashtags: ['#ChefBattles', '#FoodstaCompetition', '#CulinaryMastery'],
      battleId,
      recipeTitle: submission.dishName,
      locationTag: `${currentUser.restaurant} • Testing Lab`
    });
  };

  const voteSubmission = (battleId: string, submissionId: string) => {
    setCompetitions(prev => prev.map(c => {
      if (c.id === battleId) {
        const updated = c.submissions.map(s => {
          if (s.id === submissionId) {
            const nextVoted = !s.hasVoted;
            return {
              ...s,
              hasVoted: nextVoted,
              communityVotes: nextVoted ? s.communityVotes + 1 : Math.max(0, s.communityVotes - 1)
            };
          }
          return s;
        });
        return {
          ...c,
          submissions: rankBattleSubmissions(updated)
        };
      }
      return c;
    }));
  };

  const evaluateSubmissionAsJudge = (
    battleId: string, 
    submissionId: string, 
    scores: JudgeCriteriaScores, 
    feedback: string
  ) => {
    const overall = calculateJudgeScore(scores);
    const newEvaluation = {
      id: `eval-${Date.now()}`,
      judgeId: currentUser.id,
      judgeName: currentUser.name,
      judgeTitle: currentUser.title,
      judgeAvatar: currentUser.avatar,
      scores,
      overallScore: overall,
      writtenFeedback: feedback,
      evaluatedAt: 'Just now'
    };

    setCompetitions(prev => prev.map(c => {
      if (c.id === battleId) {
        const updatedSubs = c.submissions.map(sub => {
          if (sub.id === submissionId) {
            const evals = [newEvaluation, ...sub.judgeEvaluations];
            const avgScore = evals.reduce((sum, e) => sum + e.overallScore, 0) / evals.length;
            return {
              ...sub,
              judgeEvaluations: evals,
              expertCompositeScore: Math.round(avgScore * 10) / 10
            };
          }
          return sub;
        });

        return {
          ...c,
          submissions: rankBattleSubmissions(updatedSubs)
        };
      }
      return c;
    }));

    // Add notification to recipient
    const targetSub = competitions.find(c => c.id === battleId)?.submissions.find(s => s.id === submissionId);
    if (targetSub) {
      setNotifications(prev => [
        {
          id: `notif-${Date.now()}`,
          type: 'judge_score',
          actorName: `${currentUser.name} (${currentUser.title})`,
          actorAvatar: currentUser.avatar,
          content: `evaluated "${targetSub.dishName}" with an official score of ${overall}/100: "${feedback.slice(0, 80)}..."`,
          timestamp: 'Just now',
          isRead: false
        },
        ...prev
      ]);
    }
  };

  const applyToJob = (jobId: string) => {
    setJobs(prev => {
      const next = prev.map(j => j.id === jobId ? { ...j, isApplied: true } : j);
      const appliedIds = next.filter(j => j.isApplied).map(j => j.id);
      localStorage.setItem('foodsta_applied_jobs', JSON.stringify(appliedIds));
      return next;
    });

    setNotifications(prev => [
      {
        id: `notif-${Date.now()}`,
        type: 'career_inquiry',
        actorName: 'Foodsta Career Connect',
        actorAvatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=400&q=80',
        content: `Your complete Foodsta culinary portfolio (including ${currentUser.battlesWon} Battle Medals, verified Michelin experience, and recipe catalog) was successfully submitted to the Executive Search team.`,
        timestamp: 'Just now',
        isRead: false
      },
      ...prev
    ]);
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const sendMessage = (conversationId: string, text: string) => {
    if (!text.trim()) return;
    const newMsg = {
      id: `msg-${Date.now()}`,
      senderId: currentUser.id,
      senderName: currentUser.name,
      senderAvatar: currentUser.avatar,
      recipientId: 'recipient',
      text: text.trim(),
      timestamp: 'Just now',
      isSelf: true
    };

    setConversations(prev => prev.map(conv => {
      if (conv.id === conversationId) {
        return {
          ...conv,
          lastMessage: text.trim(),
          timestamp: 'Just now',
          messages: [...conv.messages, newMsg]
        };
      }
      return conv;
    }));
  };

  return (
    <AppContext.Provider value={{
      currentUser,
      switchUser,
      chefs,
      toggleFollowChef,
      posts,
      toggleLikePost,
      toggleSavePost,
      addCommentToPost,
      addPost,
      recipes,
      saveRecipe,
      competitions,
      submitDishToBattle,
      voteSubmission,
      evaluateSubmissionAsJudge,
      jobs,
      applyToJob,
      notifications,
      markNotificationAsRead,
      conversations,
      sendMessage,
      stories,
      activeStory,
      setActiveStory,
      activeRecipeModal,
      setActiveRecipeModal,
      activePostDetail,
      setActivePostDetail,
      isCreatePostOpen,
      setIsCreatePostOpen,
      activeBattleSubmitId,
      setActiveBattleSubmitId,
      activeJudgeSubmission,
      setActiveJudgeSubmission
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
