import {
  FriendRequestDeleted,
  FriendRequestStatus,
} from "../enums/friend.interface";

export interface IFriendRequest {
  FriendRequestId: string;
  senderId: string;
  receiverId: string;
  status: FriendRequestStatus;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  isDeleted?: FriendRequestDeleted;
}

export interface ICreateFriendRequest {
  FriendRequestId: string;
  senderId: string;
  receiverId: string;
  status: FriendRequestStatus;
}

export interface IUpdateFriendRequest {
  FriendRequestId: string;
  status: FriendRequestStatus;
}

export interface IGetFriendRequest {
  FriendRequestId: string;
  senderId: string;
  receiverId: string;
  status: FriendRequestStatus;
}
