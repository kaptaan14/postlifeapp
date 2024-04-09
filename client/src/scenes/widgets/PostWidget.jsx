import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import { baseUrl } from "Urls";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state";
import { InputBase } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
}) => {
  const [isComments, setIsComments] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;
  const [comment, setComment] = useState("");

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const patchComment = async () => {
    const response = await fetch(`${baseUrl}/posts/${postId}/comment`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ comment: comment }),
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
    setComment("");
  };

  const patchLike = async () => {
    const response = await fetch(`${baseUrl}/posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };

  return (
    <WidgetWrapper m="2rem 0">
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      />
      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>

      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>

          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>

        <IconButton>
          <ShareOutlined />
        </IconButton>
      </FlexBetween>
      {isComments && (
        <Box mt="0.5rem">
          <FlexBetween width="100%" mb={"1rem"}>
            <InputBase
              placeholder="Write a comment..."
              onChange={(e) => setComment(e.target.value)}
              value={comment}
              sx={{
                width: "90%",
                backgroundColor: palette.neutral.light,
                borderRadius: "1rem 0rem 0rem 1rem",
                padding: "0.5rem 1rem",
              }}
            />
            <IconButton disabled={!comment} onClick={patchComment}>
              <SendIcon
                sx={{ color: primary, width: "2rem", fontSize: "2rem" }}
              />
            </IconButton>
          </FlexBetween>
          <Box
            maxHeight={"200px"}
            sx={{
              overflowX: "hidden",
              "&::-webkit-scrollbar": {
                width: "6px",
              },
              "&::-webkit-scrollbar-track": {
                background: "#f1f1f1",
              },
              "&::-webkit-scrollbar-thumb": {
                background: primary,
              },
              "&::-webkit-scrollbar-thumb:hover": {
                background: "#555",
              },
            }}
          >
            {comments
              .slice()
              .reverse()
              .map((comment, i) => (
                <Box key={`${name}-${i}`}>
                  <Divider />
                  <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                    {comment}
                  </Typography>
                </Box>
              ))}
            <Divider />
          </Box>
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default PostWidget;
