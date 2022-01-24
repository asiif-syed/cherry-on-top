import {
	Facebook,
	Instagram,
	MailOutline,
	Phone,
	Pinterest,
	Room,
	Twitter,
} from '@material-ui/icons';
import styled from 'styled-components';

const Container = styled.div`
	display: flex;
	background-color: #00695c;
	color: white;
`;

const Left = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	padding: 20px;
`;

const Logo = styled.h1``;

const Desc = styled.p`
	margin: 20px 0px;
`;

const SocialContainer = styled.div`
	display: flex;
`;

const SocialIcon = styled.div`
	width: 40px;
	height: 40px;
	border-radius: 50%;
	color: white;
	background-color: #${(props) => props.color};
	display: flex;
	align-items: center;
	justify-content: center;
	margin-right: 20px;
`;

const Center = styled.div`
	flex: 1;
	padding: 20px;
`;

const Title = styled.h3`
	margin-bottom: 30px;
`;

const List = styled.ul`
	margin: 0;
	padding: 0;
	list-style: none;
	display: flex;
	flex-wrap: wrap;
`;

const ListItem = styled.li`
	width: 50%;
	margin-bottom: 10px;
	cursor: pointer;
`;

const Right = styled.div`
	flex: 1;
	padding: 20px;
`;

const ContactItem = styled.div`
	margin-bottom: 20px;
	display: flex;
	align-items: center;
`;

const Payment = styled.img`
	width: 50%;
`;

const Footer = () => {
	return (
		<Container>
			<Left>
				<Logo>CHERRY ON TOP</Logo>
				<Desc>
					There are many variations of passages of Lorem Ipsum available, but
					the majority have suffered alteration in some form, by injected
					humour, or randomised words which don’t look even slightly believable.
				</Desc>
				<SocialContainer>
					<SocialIcon color='3B5999'>
						<Facebook />
					</SocialIcon>
					<SocialIcon color='E4405F'>
						<Instagram />
					</SocialIcon>
					<SocialIcon color='55ACEE'>
						<Twitter />
					</SocialIcon>
					<SocialIcon color='E60023'>
						<Pinterest />
					</SocialIcon>
				</SocialContainer>
			</Left>
			<Center>
				<Title>Useful Links</Title>
				<List>
					<ListItem>Cakes</ListItem>
					<ListItem>Cup cakes</ListItem>
					<ListItem>Pastries</ListItem>
					<ListItem>Donuts</ListItem>
					<ListItem>Coffee</ListItem>
					<ListItem>Cookies</ListItem>
					<ListItem>Snacks</ListItem>
					<ListItem>Cart</ListItem>
					<ListItem>Terms & Conditions</ListItem>
				</List>
			</Center>
			<Right>
				<Title>Contact</Title>
				<ContactItem>
					<Room style={{ marginRight: '10px' }} /> Prakruti Enclave, Jubli
					Hills, Hyderabad, IN 500084
				</ContactItem>
				<ContactItem>
					<Phone style={{ marginRight: '10px' }} /> +91 99999 00000
				</ContactItem>
				<ContactItem>
					<MailOutline style={{ marginRight: '10px' }} /> ola@cherryontop.com
				</ContactItem>
			</Right>
		</Container>
	);
};

export default Footer;
