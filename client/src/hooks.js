import {
  messagesQuery,
  addMessageMutation,
  messageAddedSubscription,
} from './graphql/queries';
import { useQuery, useMutation, useSubscription } from '@apollo/react-hooks';

export const useChatMessages = () => {
  const { data } = useQuery(messagesQuery);

  useSubscription(messageAddedSubscription, {
    onSubscriptionData: ({ client, subscriptionData }) =>
      client.writeData({
        data: {
          messages: messages.concat(subscriptionData.data.messageAdded),
        },
      }),
  });

  const messages = data ? data.messages : [];
  const [addMessage] = useMutation(addMessageMutation);

  return {
    messages,
    addMessage: (text) => addMessage({ variables: { input: { text } } }),
  };
};
