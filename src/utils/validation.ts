// =============================================================================
// 4. src/utils/validation.ts - Validation Functions
// =============================================================================

export const validateContentIdea = (idea: any): boolean => {
  return !!(idea.title?.trim() && (idea.souls || idea.sanctification || idea.service));
};

export const validateTeamMember = (member: any): boolean => {
  return !!(member.name?.trim() && member.role);
};

export const validateTestimony = (testimony: any): boolean => {
  return !!(testimony.title?.trim() && testimony.story?.trim() && testimony.permission);
};

export const calculateReadiness = (scores: any, categories: any) => {
  const allQuestions = categories.flatMap((cat: any) => cat.questions);
  const criticalQuestions = allQuestions.filter((q: any) => q.weight === 'critical');
  const criticalAnswered = criticalQuestions.filter((q: any) => scores[q.id] === 'yes').length;
  const criticalTotal = criticalQuestions.length;
  
  const allAnswered = Object.values(scores).filter(v => v === 'yes').length;
  const allTotal = allQuestions.length;
  
  const criticalPercent = criticalTotal > 0 ? (criticalAnswered / criticalTotal) * 100 : 0;
  const overallPercent = allTotal > 0 ? (allAnswered / allTotal) * 100 : 0;
  
  let status = 'Not Ready';
  let color = 'text-red-600';
  let message = 'Critical foundations missing. Focus on prayer, accountability, and spiritual health first.';
  
  if (criticalPercent === 100 && overallPercent >= 80) {
    status = 'Ready to Launch';
    color = 'text-green-600';
    message = 'Strong foundation established. Launch with confidence and prayer.';
  } else if (criticalPercent === 100 && overallPercent >= 60) {
    status = 'Almost Ready';
    color = 'text-yellow-600';
    message = 'Critical elements in place. Address remaining areas before full launch.';
  } else if (criticalPercent >= 75) {
    status = 'Building Foundation';
    color = 'text-orange-600';
    message = 'Good progress. Focus on completing critical elements before expanding.';
  }
  
  return { status, color, message, criticalPercent, overallPercent };
};