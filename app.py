import random 


def create_deck(): #resets the deck to 52 cards
    deck = [1,1,1,1,
        2,2,2,2,
        3,3,3,3,
        4,4,4,4,
        5,5,5,5,
        6,6,6,6,
        7,7,7,7,
        8,8,8,8,
        9,9,9,9,
        10,10,10,10,
        10,10,10,10,
        10,10,10,10,
        10,10,10,10,]
    
    return deck


def normal_draw(deck):
    drawed = random.choice(deck)
    deck.remove(drawed)
    return drawed

def easy_draw():
    value = random.randint(1,10)
    return value

def hard_draw():
    value = random.randint(1,15)
    return value

def add_score(total):
    if len(personal_hand) < 5:
        top_scores.append(total)
    else:
        lowest = top_scores[0]

        for score in top_scores:
            if score < lowest:
                lowest = score

        top_scores.remove(lowest)
        
my_deck = create_deck()

def sum_of_hand(personal_hand): #calculates the sum of the cards you have
    return sum(personal_hand)

def display_top_5_scores(top_scores): 
    counter = 1 
    for score in top_scores:
        print(str(counter) + ".   " + str(score))
        counter = counter + 1
        
def add_score(total): #add the score to the scoreboard list
    if len(personal_hand) < 5: #len() calculate length of list
        top_scores.append(total)
    else:

        lowest = personal_hand[0]

        for card in personal_hand:
            if card < lowest:
                lowest = card

        top_scores.remove(lowest) #removes lowest score

        top_scores.sort(reverse=True) #descending sort for list
        
        
import random

no_of_rounds = int(input("Enter how many rounds you want to play [e.g 3]: "))

top_scores = [] #this list keeps track of the top 5 scores, at most can add 6, but must remove quite fast

for i in range(no_of_rounds): 
    print("NEW ROUND")
    personal_hand = [] #the cards that you have drawn
    deck = create_deck() 
    difficulty = input("""Choose your difficulty
1. Easy [press 'e']
2. Hard [press 'h']
3. Normal [press any other key]""")
    
    if difficulty == 'e':
        drawn = easy_draw()
        
    elif difficulty == 'h':
        drawn = hard_draw()
        
    else:
        drawn = normal_draw(deck)

        
    personal_hand.append(drawn)
        
    print(personal_hand)
    
    draw = "y" #choice for whether to draw , boolean flag
        
    while len(personal_hand) < 5 and sum_of_hand(personal_hand) < 21 and draw != 'n': #run maximum of 5 draws
        if difficulty == 'e':
            drawn = easy_draw()
        else:
            drawn = normal_draw(deck)
            
        personal_hand.append(drawn) #adds card to personal hand
        
        print(personal_hand) #shows player what cards they have drawn
        
        if sum_of_hand == 21:
            add_score(21)
            print("Congrats! You hit 21.")
        
        elif sum_of_hand(personal_hand) > 21:
            pass
            
        elif len(personal_hand) == 5:
            pass
        
        else: #give players a choice to continue drawing
            draw = input("""Would you like to draw a card?
1. No [press "n"]
2. Yes [press any other key]""")
            
            if draw == "n":
                total = sum_of_hand(personal_hand)
                

        
    if sum_of_hand(personal_hand) > 21:
        print("Oops! You lose :(")
    else:
        add_score(sum_of_hand(personal_hand)) #adds score to board regardless hit 21 or not IF player draws 5 cards
        print("Your total is", sum_of_hand(personal_hand))
        

top_scores.sort(reverse=True)

display_top_5_scores(top_scores)