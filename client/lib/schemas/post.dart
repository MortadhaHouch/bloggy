class PostItem {
  final int id;
  final int userId;
  final String title;
  final String body;

  PostItem(this.id, this.userId, this.title, this.body);

  /// create from decoded JSON map
  factory PostItem.fromJson(Map<String, dynamic> json) {
    return PostItem(
      json['id'] as int,
      json['userId'] as int,
      json['title'] as String,
      json['body'] as String,
    );
  }
}
