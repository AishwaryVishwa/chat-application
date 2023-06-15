import React, { useContext } from 'react'
import { Box, Image, Input, Text,Button } from '@chakra-ui/react'
import { userContext } from '../Context/UserProvider'
import { BsThreeDotsVertical } from 'react-icons/bs';
import { FiSend } from 'react-icons/fi';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure
} from '@chakra-ui/react'
import UpdateGroupModal from './UpdateGroupModal';
import SenderDetails from './SenderDetails';
function Chats({ fetchAgain, setFetchAgain }) {
  const { userData, chatList, setChatList, selectedChat, setSelectedChat } = useContext(userContext)
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Box
        height='87vh'
        width='350px'
        p={2}
        // paddingBottom={2}
        m={2}
        bg='white'
        // bg='black'

        w='8xl'
        borderRadius='10'
      >

        {
          !selectedChat ?
            <Box
              display='flex'
              alignItems='center'
              justifyContent='center'
              height='85vh'
              fontSize='30px'
            //  bg='aqua'
            >
              <Text>Select someone to start chat.</Text>
            </Box>
            :
            <Box>

              <Box
                bg='aliceblue'
                height='60px'
                borderTopRadius='10px'
                p='8px'
                display='flex'
                alignItems='center'
                justifyContent='space-between'
              >
                <Text>

                  {(selectedChat.isGroupChat) ? selectedChat.chatName : selectedChat.users[0]._id === userData._id ? selectedChat.users[1].name : selectedChat.users[0].name}

                </Text>

                <BsThreeDotsVertical
                  cursor='pointer'
                  onClick={onOpen}
                />


                <Modal isOpen={isOpen} onClose={onClose}>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>{(selectedChat.isGroupChat) ? selectedChat.chatName : selectedChat.users[0]._id === userData._id ? selectedChat.users[1].name : selectedChat.users[0].name}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                      {
                        (selectedChat.isGroupChat) ?
                          <UpdateGroupModal fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} onClose={onClose} />
                          :
                          <SenderDetails sender={selectedChat.users[0]._id === userData._id ? selectedChat.users[1] : selectedChat.users[0]} />
                      }
                    </ModalBody>

                    <ModalFooter>

                    </ModalFooter>
                  </ModalContent>
                </Modal>

              </Box>




              <Box
                bg='green.100'
                height='75vh'
                borderBottomRadius='10px'
                display='flex'
                 alignItems='flex-end'
                 p={2}
              >


                <Input  bg='white' ></Input>
                 <Button><FiSend/></Button>

              </Box>

            </Box>
        }

      </Box>
    </>
  )
}

export default Chats