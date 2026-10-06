import json
from pathlib import Path

DATA = Path('data/grade1/english/vocabulary.json')
FALLBACK = {
    'I':'tôi / mình','you':'bạn / các bạn','we':'chúng tôi / chúng ta','they':'họ / chúng',
    'he':'anh ấy / cậu ấy','she':'cô ấy / bạn ấy','it':'nó / vật đó','a':'một','an':'một','the':'cái / con / vật đó',
    'am':'là (dùng với I)','are':'là / ở / thì','is':'là / ở / thì','and':'và','or':'hoặc','to':'đến / để',
    'have':'có','has':'có (dùng với he, she, it)','can':'có thể',"can't":'không thể','not':'không',
    'in':'trong','on':'trên','under':'bên dưới','next to':'bên cạnh','behind':'phía sau','between':'ở giữa',
    'front':'phía trước','set':'đặt / bộ','see':'nhìn thấy','my':'của tôi','your':'của bạn / các bạn',
    'stand up':'đứng lên','sit down':'ngồi xuống','open your book':'mở sách ra','raise your hand':'giơ tay',
    'sit nicely':'ngồi ngay ngắn','be quiet':'giữ im lặng','listen and look':'lắng nghe và nhìn','speak English':'nói tiếng Anh',
    'happy':'vui','sad':'buồn','angry':'tức giận','hungry':'đói','thirsty':'khát','tired':'mệt','scared':'sợ',
    'sunny':'có nắng','rainy':'có mưa','cloudy':'nhiều mây','windy':'có gió','stormy':'có bão','hot':'nóng','cold':'lạnh',
    'monday':'thứ Hai','tuesday':'thứ Ba','wednesday':'thứ Tư','thursday':'thứ Năm','friday':'thứ Sáu','saturday':'thứ Bảy','sunday':'Chủ nhật',
    'one':'một','two':'hai','three':'ba','four':'bốn','five':'năm','six':'sáu','seven':'bảy','eight':'tám','nine':'chín','ten':'mười',
    'red':'đỏ','yellow':'vàng','green':'xanh lá cây','pink':'hồng','purple':'tím','orange':'cam','blue':'xanh dương','black':'đen','white':'trắng','brown':'nâu','gray':'xám',
    'like':'thích','window':'cửa sổ','door':'cửa ra vào','chair':'ghế','desk':'bàn học','bin':'thùng rác','poster':'áp phích','board':'bảng','bag':'cặp / túi','book':'sách','cupboard':'tủ',
    'ruler':'thước kẻ','rubber':'cục tẩy','pencil sharpener':'gọt bút chì','pencil case':'hộp bút','pen':'bút mực','pencil':'bút chì',
    'mum':'mẹ','dad':'bố','grandpa':'ông','grandma':'bà','sister':'chị / em gái','brother':'anh / em trai','twin':'sinh đôi','uncle':'chú / cậu / bác trai','auntie':'cô / dì / bác gái','cousin':'anh chị em họ',
    'old':'già / lớn tuổi','young':'trẻ','tall':'cao','short':'thấp','pretty':'xinh đẹp','handsome':'đẹp trai','lion':'sư tử','deer':'hươu','family':'gia đình','baby':'em bé','duck':'con vịt','father':'bố / cha','mother':'mẹ','parents':'bố mẹ',
    'doll':'búp bê','skipping rope':'dây nhảy','ball':'quả bóng','robot':'rô-bốt','boat':'thuyền','scooter':'xe scooter','skateboard':'ván trượt','kite':'diều','yoyo':'yo-yo','teddy':'gấu bông',
    'play football':'chơi bóng đá','play tennis':'chơi quần vợt','run':'chạy','ride a horse':'cưỡi ngựa','ride a bike':'đi xe đạp','rollerblade':'trượt patin','football game':'trận bóng đá','glue':'keo dán','stars':'những ngôi sao','counters':'quân đếm','paper':'giấy',
    'cat':'con mèo','dog':'con chó','hamster':'chuột hamster','bird':'chim','snake':'rắn','spider':'nhện','tortoise':'rùa','mouse':'chuột','rabbit':'thỏ','pet':'thú cưng','fish':'cá','farm':'nông trại','cow':'bò','sheep':'cừu','donkey':'lừa','goat':'dê','chicken':'gà',
    'circle':'hình tròn','triangle':'hình tam giác','rectangle':'hình chữ nhật','square':'hình vuông','oval':'hình bầu dục',
    'cheese':'phô mai','meat':'thịt','pasta':'mì ống','sandwiches':'bánh mì kẹp','bread':'bánh mì','milk':'sữa','juice':'nước ép','rice':'cơm / gạo','eggs':'trứng','apples':'táo','bananas':'chuối',
    'Santa':'ông già Noel','elf':'yêu tinh','snowman':'người tuyết','reindeer':'tuần lộc',
    'wings':'cánh','beak':'mỏ','ears':'tai','tail':'đuôi','eyes':'mắt','head':'đầu','nose':'mũi','mouth':'miệng','arms':'cánh tay','legs':'chân',
    'fly':'bay','walk':'đi bộ','talk':'nói','climb':'leo trèo','jump':'nhảy','swim':'bơi','bat':'dơi','squirrel':'sóc','elephant':'voi','giraffe':'hươu cao cổ','hour':'giờ','chameleon':'tắc kè hoa',
    'hat':'mũ','shorts':'quần đùi','sweater':'áo len','shirt':'áo sơ mi','jacket':'áo khoác','skirt':'váy','trousers':'quần dài','T-shirt':'áo phông','shoes':'giày','socks':'tất',
    'blond hair':'tóc vàng','dark hair':'tóc sẫm màu','curly hair':'tóc xoăn','straight hair':'tóc thẳng','long hair':'tóc dài','glasses':'kính mắt',
    'picture':'bức tranh','wardrobe':'tủ quần áo','bed':'giường','clock':'đồng hồ','bookcase':'tủ sách','plant':'cây cảnh','television':'tivi','table':'bàn','sofa':'ghế sofa','cushion':'đệm / gối tựa',
    'living room':'phòng khách','bedroom':'phòng ngủ','bathroom':'phòng tắm','kitchen':'nhà bếp','dining room':'phòng ăn','garden':'khu vườn'
}

data = json.loads(DATA.read_text(encoding='utf-8'))
missing = []
for item in data.get('words', []):
    word = item.get('word', '')
    meaning = FALLBACK.get(word, '')
    if not item.get('vietnameseMeaning') and meaning:
        item['vietnameseMeaning'] = meaning
    if not item.get('vietnameseMeaning'):
        missing.append(word)
data['version'] = int(data.get('version', 26)) + 1
data['lastUpdatedFrom'] = 'Vietnamese meaning backfill from common dictionary equivalents'
DATA.write_text(json.dumps(data, ensure_ascii=False, separators=(',', ':')), encoding='utf-8')
print(f'Updated {len(data.get("words", [])) - len(missing)} entries; missing: {missing}')
