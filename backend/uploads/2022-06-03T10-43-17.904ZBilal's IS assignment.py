import string
#This is caeser cipher implementation
def Encrypt(text,shift,letters):
    def shift_letter(letter):
        return letter[shift:] + letter[:shift]
    shifted_letters = tuple(map(shift_letter, letters))
    print(type(shifted_letters) ,"\n")
    final_letters = ''.join(letters)
    final_shifted_letters = ''.join(shifted_letters)
    table = str.maketrans(final_letters,final_shifted_letters)
    return text.translate(table)
plaintext ="Hello World"
print(Encrypt(plaintext, 7, [string.ascii_lowercase,string.ascii_uppercase]))


#This is Transposition of Cipher Text
text = "tranposition assignment"
key=8
cipher_text = ['']* key
for column in range(key):
    pointer=column
    while pointer< len(text):
        cipher_text[column] += text[pointer]
        pointer +=key 
print(cipher_text)