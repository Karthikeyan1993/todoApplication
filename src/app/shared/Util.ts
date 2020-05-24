export class Util {
  public static getTagClass = tag => {
    return {
      'tag-general': tag === 'General',
      'tag-home': tag === 'Home',
      'tag-office': tag === 'Office',
      'tag-personal': tag === 'Personal'
    };
  }
  public static getPriorityClass = priority => {
    return {
      'flag-high': priority === 'High',
      'flag-medium': priority === 'Medium',
      'flag-low': priority === 'Low'
    };
  }
  public static getStatusClass = status => {
    return {
      'badge-danger': status === 'Overdue',
      'badge-success': status === 'Completed',
      'badge-primary': status === 'In Progress'
    };
  }
}
